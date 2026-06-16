"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send, ArrowLeft, Upload, X, Check, Loader2, Image as ImageIcon, Camera,
  ChevronRight, Crown
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Step =
  | { id: string; bot: string; type: "text"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "money"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "phone"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "email"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "number"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "boolean"; yes?: string; no?: string }
  | { id: string; bot: string; type: "choice"; options: string[] }
  | { id: string; bot: string; type: "photos"; minPhotos?: number }
  | { id: string; bot: string; type: "longtext"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "final" };

const STEPS: Step[] = [
  { id: "intro_name", bot: "¡Hola! Soy el asistente de Realty Kings PR. Voy a hacerte unas preguntas sobre tu propiedad para preparar una oferta justa. ¿Cuál es tu nombre completo?", type: "text", placeholder: "Tu nombre", required: true },
  { id: "phone", bot: "Mucho gusto, {intro_name}. ¿Cuál es tu número de teléfono? Lo usaremos solo para llamarte con la oferta.", type: "phone", placeholder: "787-555-1234", required: true },
  { id: "email", bot: "¿Y tu email? Te enviaremos un resumen de la oferta por escrito.", type: "email", placeholder: "tu@correo.com", required: true },
  { id: "address", bot: "Perfecto. Ahora cuéntame de la propiedad. ¿Cuál es la dirección completa?", type: "text", placeholder: "Calle, Urb, Municipio, Puerto Rico", required: true },
  { id: "asking_price", bot: "¿Tienes una idea del precio que quieres por la propiedad? (Si no estás seguro, pon un estimado y lo ajustamos juntos)", type: "money", placeholder: "150000", required: false },
  { id: "cadastre_number", bot: "¿Tienes el número de catastro de la propiedad? Si no lo tienes a mano, escribe 'no sé' y seguimos.", type: "text", placeholder: "###-###-###-##-###", required: false },
  { id: "units", bot: "¿Cuántas unidades tiene la propiedad? (Por ejemplo, una casa = 1 unidad; un edificio con 4 apartamentos = 4)", type: "number", placeholder: "1", required: true },

  // CHECKLIST PROPIEDADES
  { id: "land_description", bot: "Hablemos del solar. ¿Cómo describes el terreno y las colindancias? (ej: 'esquina, colinda con casa y vereda al lado')", type: "longtext", placeholder: "Describe el terreno", required: false },
  { id: "cables_pass_roof", bot: "¿Pasan cables eléctricos por encima del techo de la propiedad?", type: "boolean", yes: "Sí, pasan cables", no: "No pasan" },
  { id: "roof_condition", bot: "¿En qué condición está el techo? (ej: 'concreto, sellado en 2022', 'zinc con filtración', 'no sé')", type: "text", placeholder: "Estado del techo", required: false },
  { id: "sewer_type", bot: "¿La propiedad tiene pozo séptico o alcantarillado público?", type: "choice", options: ["Alcantarillado", "Pozo séptico", "No sé"] },
  { id: "sewer_distance", bot: "Si tiene pozo séptico, ¿está a más de 5 pies de la estructura? (Si no aplica, pon 'no aplica')", type: "text", placeholder: "Sí / No / No aplica", required: false },
  { id: "aaa_meter", bot: "¿Cuál es el número de cuenta del contador de AAA (agua)? Si no lo tienes, pon 'no sé'.", type: "text", placeholder: "Número de cuenta AAA", required: false },
  { id: "aee_meter", bot: "¿Y el número de cuenta del contador AEE (luz)?", type: "text", placeholder: "Número de cuenta AEE / LUMA", required: false },
  { id: "neighboring", bot: "¿Cómo describes las propiedades aledañas? (ej: 'área residencial bien cuidada', 'colinda con negocio', 'cerca de escuela')", type: "longtext", placeholder: "Descripción del vecindario", required: false },
  { id: "obsolescence", bot: "¿Hay alguna obsolescencia o encroachment (invasión de terreno) que debamos saber? (ej: 'la cocina está dentro de la servidumbre eléctrica')", type: "longtext", placeholder: "Describe o pon 'ninguna'", required: false },
  { id: "is_inheritance", bot: "¿La propiedad es una herencia?", type: "boolean", yes: "Sí, es herencia", no: "No" },

  // PHOTOS
  { id: "photos_exterior", bot: "¿Puedes subir 2-4 fotos del exterior de la propiedad? (frente, lados, patio)", type: "photos", minPhotos: 0 },
  { id: "photos_interior", bot: "Y ahora del interior — sala, cocina, baños, cuartos. Cuantas más, mejor para evaluar.", type: "photos", minPhotos: 0 },

  { id: "comments", bot: "Última pregunta: ¿hay algo más que debamos saber? Cualquier detalle importante — situación legal, urgencia, condición especial.", type: "longtext", placeholder: "Comentarios adicionales (opcional)", required: false },

  { id: "submit", bot: "¡Perfecto! Tengo toda la información. Cuando le des a 'Enviar', un miembro de nuestro equipo te llamará dentro de 24 horas con una oferta. ¿Procedemos?", type: "final" },
];

type Answer = string | boolean | number | File[];

export default function ChatPage() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [history, setHistory] = useState<Array<{ role: "bot" | "user"; content: string; stepId?: string }>>([]);
  const [typing, setTyping] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const step = STEPS[stepIdx];
  const progress = Math.round((stepIdx / STEPS.length) * 100);

  // Show first bot message on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setHistory([{ role: "bot", content: renderTemplate(STEPS[0].bot, answers), stepId: STEPS[0].id }]);
      setTyping(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, typing]);

  function renderTemplate(text: string, ans: Record<string, Answer>): string {
    return text.replace(/\{(\w+)\}/g, (_, k) => {
      const v = ans[k];
      if (typeof v === "string") return v.split(" ")[0]; // first name
      return "";
    });
  }

  function advance(userText: string, value: Answer) {
    const currentStep = STEPS[stepIdx];
    const newAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(newAnswers);
    setHistory((h) => [...h, { role: "user", content: userText, stepId: currentStep.id }]);

    const nextIdx = stepIdx + 1;
    if (nextIdx >= STEPS.length) return;
    setStepIdx(nextIdx);
    setTyping(true);
    setTimeout(() => {
      setHistory((h) => [...h, { role: "bot", content: renderTemplate(STEPS[nextIdx].bot, newAnswers), stepId: STEPS[nextIdx].id }]);
      setTyping(false);
    }, 700 + Math.random() * 400);
  }

  async function submitLead() {
    setSubmitting(true);
    setError(null);
    try {
      if (!supabase) throw new Error("Servidor no configurado. Llama 787-946-0003.");

      // 1. Upload photos to Supabase Storage
      const photoUrls: string[] = [];
      for (const which of ["photos_exterior", "photos_interior"] as const) {
        const files = answers[which];
        if (Array.isArray(files)) {
          for (const file of files) {
            const stamp = new Date().toISOString().replace(/[:.]/g, "-");
            const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
            const path = `${stamp}_${which}_${safe}`;
            const up = await supabase.storage.from("lead-photos").upload(path, file);
            if (up.error) {
              console.warn("Upload error:", up.error);
              continue;
            }
            const { data } = supabase.storage.from("lead-photos").getPublicUrl(path);
            photoUrls.push(data.publicUrl);
          }
        }
      }

      // 2. Build the lead record
      const askingPrice = Number(answers.asking_price) || null;
      const units = Number(answers.units) || null;
      const lead = {
        org_id: "00000000-0000-0000-0000-000000000001",
        source: "website_funnel",
        address: String(answers.address || ""),
        municipality: extractMunicipality(String(answers.address || "")),
        asking_price: askingPrice,
        cadastre_number: String(answers.cadastre_number || ""),
        units,
        contact_name: String(answers.intro_name || ""),
        contact_phone: String(answers.phone || ""),
        contact_email: String(answers.email || ""),
        stage: "new",
        encroachment: !!answers.cables_pass_roof,
        sewer_type: String(answers.sewer_type || ""),
        structural_issues: String(answers.roof_condition || ""),
        is_inheritance: !!answers.is_inheritance,
        notes: buildNotes(answers),
        photos_urls: photoUrls,
        checklist_data: cleanForJSON(answers),
      };

      const { error: insErr } = await supabase.from("leads").insert(lead);
      if (insErr) throw insErr;

      router.push("/gracias");
    } catch (e: any) {
      setError(e?.message || "Algo falló. Intenta de nuevo o llama 787-946-0003.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf7] flex flex-col">
      <ChatHeader progress={progress} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {history.map((m, i) => (
            <Bubble key={i} role={m.role} content={m.content} />
          ))}
          {typing && <TypingIndicator />}
        </div>
      </div>

      <div className="border-t border-ink/10 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {!typing && step && step.id !== "submit" ? (
            <InputArea
              step={step}
              onAnswer={(userText, value) => advance(userText, value)}
            />
          ) : !typing && step?.id === "submit" ? (
            <div className="space-y-3">
              {error && (
                <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded p-3">{error}</div>
              )}
              <button
                onClick={submitLead}
                disabled={submitting}
                className="btn btn-gold w-full text-base py-4"
              >
                {submitting ? (
                  <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                ) : (
                  <><Check size={18} /> Enviar mi información</>
                )}
              </button>
              <p className="text-xs text-ink/50 text-center">
                Al enviar, aceptas que Realty Kings te contacte por teléfono o email para discutir la oferta.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ChatHeader({ progress }: { progress: number }) {
  return (
    <header className="bg-ink text-white sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-white/60 hover:text-white">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <div className="h-9 w-9 rounded-full bg-gold-gradient flex items-center justify-center">
            <Crown size={16} className="text-ink" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-tight">Realty Kings</div>
            <div className="text-[10px] text-white/50 leading-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              En línea — Te responde en segundos
            </div>
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-white/10">
        <div className="h-full bg-gold-gradient transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}

function Bubble({ role, content }: { role: "bot" | "user"; content: string }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed
        ${role === "bot" ? "chat-bubble-bot rounded-tl-md" : "chat-bubble-user rounded-tr-md"}`}>
        {content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="chat-bubble-bot rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1">
        <span className="dot w-1.5 h-1.5 bg-ink/40 rounded-full inline-block" />
        <span className="dot w-1.5 h-1.5 bg-ink/40 rounded-full inline-block" />
        <span className="dot w-1.5 h-1.5 bg-ink/40 rounded-full inline-block" />
      </div>
    </div>
  );
}

function InputArea({ step, onAnswer }: { step: Step; onAnswer: (text: string, value: Answer) => void }) {
  const [val, setVal] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  if (step.type === "boolean") {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => onAnswer((step as any).yes || "Sí", true)}
          className="flex-1 btn btn-dark"
        >
          {(step as any).yes || "Sí"}
        </button>
        <button
          onClick={() => onAnswer((step as any).no || "No", false)}
          className="flex-1 btn btn-ghost"
        >
          {(step as any).no || "No"}
        </button>
      </div>
    );
  }

  if (step.type === "choice") {
    return (
      <div className="space-y-2">
        {(step as any).options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => onAnswer(opt, opt)}
            className="w-full btn btn-ghost text-left justify-between"
          >
            {opt} <ChevronRight size={14} />
          </button>
        ))}
      </div>
    );
  }

  if (step.type === "photos") {
    return (
      <div className="space-y-3">
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {files.map((f, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-ink/5">
                <img src={URL.createObjectURL(f)} alt={f.name} className="absolute inset-0 w-full h-full object-cover" />
                <button
                  onClick={() => setFiles(files.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <label className="flex-1 btn btn-ghost cursor-pointer">
            <Camera size={16} />
            {files.length > 0 ? "Agregar más" : "Tomar / Subir fotos"}
            <input
              type="file"
              accept="image/*"
              multiple
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const newFiles = Array.from(e.target.files || []);
                setFiles([...files, ...newFiles]);
              }}
            />
          </label>
          <button
            onClick={() => onAnswer(files.length > 0 ? `${files.length} foto(s) subida(s)` : "Sin fotos por ahora", files)}
            className="btn btn-gold px-6"
          >
            {files.length > 0 ? "Listo" : "Saltar"} <ChevronRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  if (step.type === "longtext") {
    return (
      <div className="space-y-2">
        <textarea
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={(step as any).placeholder}
          rows={3}
          className="input w-full resize-none"
          autoFocus
        />
        <button
          onClick={() => onAnswer(val || "(sin comentarios)", val)}
          className="btn btn-gold w-full"
        >
          {val ? "Continuar" : "Saltar"} <ChevronRight size={14} />
        </button>
      </div>
    );
  }

  const inputType = step.type === "phone" ? "tel" : step.type === "email" ? "email" : step.type === "money" || step.type === "number" ? "number" : "text";
  const placeholder = (step as any).placeholder || "Escribe tu respuesta...";
  const required = ((step as any).required ?? true) !== false;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (required && !val.trim()) return;
        const sendText = step.type === "money" ? `$${val}` : val;
        onAnswer(sendText, val);
        setVal("");
      }}
      className="flex gap-2"
    >
      {step.type === "money" && (
        <div className="absolute pl-3 pt-3 pointer-events-none text-ink/50">$</div>
      )}
      <input
        type={inputType}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className={`input flex-1 ${step.type === "money" ? "pl-7" : ""}`}
        autoFocus
        inputMode={step.type === "number" || step.type === "money" ? "numeric" : undefined}
      />
      <button
        type="submit"
        disabled={required && !val.trim()}
        className="btn btn-gold px-5 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Send size={16} />
      </button>
    </form>
  );
}

function extractMunicipality(address: string): string {
  // Try second-to-last comma section (e.g. "Calle, Urb, Bayamón, PR" → "Bayamón")
  const parts = address.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 3) return parts[parts.length - 2];
  if (parts.length >= 2) return parts[parts.length - 1];
  return "";
}

function buildNotes(a: Record<string, Answer>): string {
  const lines: string[] = [];
  if (a.land_description) lines.push(`Solar/colindancias: ${a.land_description}`);
  if (a.cables_pass_roof !== undefined) lines.push(`Cables eléctricos sobre techo: ${a.cables_pass_roof ? "SÍ" : "NO"}`);
  if (a.roof_condition) lines.push(`Techo: ${a.roof_condition}`);
  if (a.sewer_type) lines.push(`Drenaje: ${a.sewer_type}`);
  if (a.sewer_distance) lines.push(`Distancia pozo séptico: ${a.sewer_distance}`);
  if (a.aaa_meter) lines.push(`AAA: ${a.aaa_meter}`);
  if (a.aee_meter) lines.push(`AEE/LUMA: ${a.aee_meter}`);
  if (a.neighboring) lines.push(`Aledañas: ${a.neighboring}`);
  if (a.obsolescence) lines.push(`Obsolescencias: ${a.obsolescence}`);
  if (a.is_inheritance !== undefined) lines.push(`Herencia: ${a.is_inheritance ? "SÍ" : "NO"}`);
  if (a.comments) lines.push(`---\nComentarios del vendedor:\n${a.comments}`);
  return lines.join("\n");
}

function cleanForJSON(a: Record<string, Answer>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(a)) {
    if (Array.isArray(v)) continue; // skip File arrays
    out[k] = v;
  }
  return out;
}
