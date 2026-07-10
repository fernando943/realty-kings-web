"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send, ArrowLeft, X, Check, Loader2, Camera,
  ChevronRight, Clock, Shield, Phone, MapPin, Paperclip, Navigation, FileText
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

/* ============================================================
   STEPS — the Realty Kings acquisition questionnaire
   (mirrors Check List Propiedades). Shared by the hero embed
   and the full-screen /chat page so they never drift.
   ============================================================ */
type Step =
  | { id: string; bot: string; type: "text"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "money"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "phone"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "email"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "number"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "boolean"; yes?: string; no?: string }
  | { id: string; bot: string; type: "choice"; options: string[] }
  | { id: string; bot: string; type: "photos"; minPhotos?: number }
  | { id: string; bot: string; type: "files"; minFiles?: number }
  | { id: string; bot: string; type: "location"; required?: boolean }
  | { id: string; bot: string; type: "longtext"; placeholder?: string; required?: boolean }
  | { id: string; bot: string; type: "final" };

export const STEPS: Step[] = [
  { id: "intro_name", bot: "¡Hola! Soy su asesor de Realty Kings. Le hago unas preguntas rápidas y confidenciales sobre su propiedad para prepararle una oferta cash justa. Para empezar, ¿cuál es su nombre completo?", type: "text", placeholder: "Su nombre completo", required: true },
  { id: "phone", bot: "Mucho gusto, {intro_name}. ¿Cuál es su número de teléfono? Solo lo usamos para llamarle con la oferta.", type: "phone", placeholder: "787-555-1234", required: true },
  { id: "email", bot: "¿Y su email? Le enviamos un resumen de la oferta por escrito.", type: "email", placeholder: "su@correo.com", required: true },
  { id: "address", bot: "Perfecto. Ahora cuénteme de la propiedad. ¿Cuál es la dirección completa?", type: "text", placeholder: "Calle, Urbanización, Municipio, Puerto Rico", required: true },
  { id: "property_location", bot: "¿Me puede compartir la ubicación de la propiedad? Comparta su ubicación GPS (si está en la propiedad) o pegue un enlace de Google Maps — nos ayuda a localizarla exacto.", type: "location", required: false },
  { id: "reason", bot: "¿Cuál es la razón principal para vender?", type: "choice", options: ["Herencia / sucesión", "Atrasos (CRIM, hipoteca, LUMA)", "Ejecución hipotecaria", "Divorcio", "Mudanza / me voy de PR", "Propiedad con problemas", "Otra razón"] },
  { id: "asking_price", bot: "¿Tiene una idea del precio que quiere por la propiedad? (Si no está seguro, ponga un estimado y lo ajustamos juntos)", type: "money", placeholder: "150000", required: false },
  { id: "cadastre_number", bot: "¿Tiene el número de catastro? Si no lo tiene a mano, escriba 'no sé' y seguimos.", type: "text", placeholder: "###-###-###-##-###", required: false },
  { id: "units", bot: "¿Cuántas unidades tiene la propiedad? (Una casa = 1; un edificio de 4 apartamentos = 4)", type: "number", placeholder: "1", required: true },

  // CHECKLIST PROPIEDADES
  { id: "land_description", bot: "Hablemos del solar. ¿Cómo describe el terreno y las colindancias? (ej: 'esquina, colinda con casa y vereda al lado')", type: "longtext", placeholder: "Describa el terreno", required: false },
  { id: "cables_pass_roof", bot: "¿Pasan cables eléctricos por encima del techo de la propiedad?", type: "boolean", yes: "Sí, pasan cables sobre el techo", no: "No, el techo está despejado" },
  { id: "roof_condition", bot: "¿En qué condición está el techo? (ej: 'concreto, sellado en 2022', 'zinc con filtración', 'no sé')", type: "text", placeholder: "Estado del techo", required: false },
  { id: "sewer_type", bot: "¿La propiedad tiene pozo séptico o alcantarillado público?", type: "choice", options: ["Alcantarillado", "Pozo séptico", "No sé"] },
  { id: "sewer_distance", bot: "Si tiene pozo séptico, ¿está a más de 5 pies de la estructura? (Si no aplica, ponga 'no aplica')", type: "text", placeholder: "Sí / No / No aplica", required: false },
  { id: "aaa_meter", bot: "¿Cuál es el número de cuenta del contador de AAA (agua)? Si no lo tiene, ponga 'no sé'.", type: "text", placeholder: "Número de cuenta AAA", required: false },
  { id: "aee_meter", bot: "¿Y el número de cuenta del contador AEE / LUMA (luz)?", type: "text", placeholder: "Número de cuenta AEE / LUMA", required: false },
  { id: "neighboring", bot: "¿Cómo describe las propiedades aledañas? (ej: 'área residencial bien cuidada', 'colinda con negocio', 'cerca de escuela')", type: "longtext", placeholder: "Descripción del vecindario", required: false },
  { id: "obsolescence", bot: "¿Hay alguna obsolescencia o invasión de terreno que debamos saber? (ej: 'la cocina está dentro de la servidumbre eléctrica')", type: "longtext", placeholder: "Describa o ponga 'ninguna'", required: false },
  { id: "is_inheritance", bot: "¿La propiedad es una herencia?", type: "boolean", yes: "Sí, es una herencia", no: "No, es propia" },

  // PHOTOS
  { id: "photos_exterior", bot: "¿Puede subir 2-4 fotos del exterior? (frente, lados, patio). Ayudan muchísimo con la oferta.", type: "photos", minPhotos: 0 },
  { id: "photos_interior", bot: "Y ahora del interior — sala, cocina, baños, cuartos. Cuantas más, mejor.", type: "photos", minPhotos: 0 },

  { id: "documents", bot: "¿Tiene documentos de la propiedad? Escritura, CRIM, tasación, planos, factura de LUMA/AAA — suba lo que tenga (imágenes o PDF). Es opcional, pero acelera su oferta.", type: "files", minFiles: 0 },

  { id: "comments", bot: "Última pregunta: ¿algo más que debamos saber? Cualquier detalle importante — situación legal, urgencia, condición especial.", type: "longtext", placeholder: "Comentarios adicionales (opcional)", required: false },

  { id: "submit", bot: "¡Listo! Tengo toda la información. Cuando confirme, un asesor de Realty Kings le llamará en las próximas 24 horas con su oferta cash personalizada. Gracias por su tiempo.", type: "final" },
];

type LocationVal = { lat?: number; lng?: number; mapsUrl?: string };
type Answer = string | boolean | number | File[] | LocationVal;

/* ============================================================
   ChatFunnel — variant: "embedded" (hero card) | "fullscreen" (/chat)
   ============================================================ */
export function ChatFunnel({
  variant = "embedded",
  initialAddress = "",
}: {
  variant?: "embedded" | "fullscreen";
  initialAddress?: string;
}) {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>(
    initialAddress ? { address: initialAddress } : {}
  );
  const [history, setHistory] = useState<Array<{ role: "bot" | "user"; content: string; stepId?: string }>>([]);
  const [typing, setTyping] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mountedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  const utmRef = useRef<Record<string, string>>({});

  const step = STEPS[stepIdx];
  const progress = Math.round((stepIdx / STEPS.length) * 100);
  const remainingMinutes = Math.max(1, Math.round(((STEPS.length - stepIdx) * 20) / 60));
  const isFull = variant === "fullscreen";

  useEffect(() => {
    const t = setTimeout(() => {
      setHistory([{ role: "bot", content: renderTemplate(STEPS[0].bot, answers), stepId: STEPS[0].id }]);
      setTyping(false);
    }, 500);
    // capture attribution + fire funnel-start event
    try {
      const p = new URLSearchParams(window.location.search);
      const u: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "ref"].forEach((k) => {
        const v = p.get(k);
        if (v) u[k] = v;
      });
      u.referrer = document.referrer || "";
      utmRef.current = u;
    } catch {}
    track("chat_started", { variant });
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, typing]);

  function renderTemplate(text: string, ans: Record<string, Answer>): string {
    return text.replace(/\{(\w+)\}/g, (_, k) => {
      const v = ans[k];
      if (typeof v === "string") return v.split(" ")[0];
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
    }, 650 + Math.random() * 350);
  }

  async function submitLead() {
    setSubmitting(true);
    setError(null);
    // Bot protection: honeypot filled, or funnel "completed" impossibly fast for a human.
    const elapsedMs = Date.now() - mountedAt.current;
    if (honeypotRef.current?.value || elapsedMs < 8000) {
      router.push("/gracias"); // silently drop — don't insert a bot lead
      return;
    }
    try {
      if (!supabase) throw new Error("Servidor no configurado. Llame al 787-667-9389.");

      const photoUrls: string[] = [];
      for (const which of ["photos_exterior", "photos_interior"] as const) {
        const files = answers[which];
        if (Array.isArray(files)) {
          for (const file of files) {
            const stamp = new Date().toISOString().replace(/[:.]/g, "-");
            const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
            const path = `${stamp}_${which}_${safe}`;
            const up = await supabase.storage.from("lead-photos").upload(path, file);
            if (up.error) { console.warn("Upload error:", up.error); continue; }
            const { data } = supabase.storage.from("lead-photos").getPublicUrl(path);
            photoUrls.push(data.publicUrl);
          }
        }
      }

      // Documents (escritura, CRIM, tasación, PDFs…) → same bucket, docs/ prefix
      const documentUrls: string[] = [];
      const docFiles = answers["documents"];
      if (Array.isArray(docFiles)) {
        for (const file of docFiles) {
          const stamp = new Date().toISOString().replace(/[:.]/g, "-");
          const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
          const path = `docs/${stamp}_${safe}`;
          const up = await supabase.storage.from("lead-photos").upload(path, file);
          if (up.error) { console.warn("Doc upload error:", up.error); continue; }
          const { data } = supabase.storage.from("lead-photos").getPublicUrl(path);
          documentUrls.push(data.publicUrl);
        }
      }

      const rawLoc = answers["property_location"];
      const loc: LocationVal | null =
        rawLoc && typeof rawLoc === "object" && !Array.isArray(rawLoc) ? (rawLoc as LocationVal) : null;

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
        notes: buildNotes(answers, { documentUrls, loc }),
        photos_urls: photoUrls,
        checklist_data: { ...cleanForJSON(answers), document_urls: documentUrls, property_location: loc || undefined, utm: utmRef.current, completed_ms: elapsedMs },
      };

      const { error: insErr } = await supabase.from("leads").insert(lead);
      if (insErr) throw insErr;

      track("lead_submitted", {
        municipality: lead.municipality || "n/a",
        reason: String(answers.reason || "n/a"),
        source: utmRef.current.utm_source || "direct",
      });
      router.push("/gracias");
    } catch (e: any) {
      setError(e?.message || "Algo falló. Intente de nuevo o llame al 787-667-9389.");
      setSubmitting(false);
    }
  }

  /* ---- Message stream + input (shared by both variants) ---- */
  const conversation = (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll min-h-0">
        <div className={`mx-auto ${isFull ? "max-w-2xl px-5 py-8" : "px-4 py-5"} space-y-4`}>
          {history.map((m, i) => (
            <Bubble key={i} role={m.role} content={m.content} big={isFull} />
          ))}
          {typing && <TypingIndicator />}
        </div>
      </div>

      <div className="border-t border-ink/10 bg-white flex-shrink-0">
        <div className={`mx-auto ${isFull ? "max-w-2xl px-5 py-4" : "px-4 py-3"}`}>
          {/* honeypot: real users never see/fill this; bots do */}
          <input ref={honeypotRef} type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          {!typing && step && step.id !== "submit" ? (
            <InputArea step={step} autoFocus={isFull} onAnswer={(t, v) => advance(t, v)} />
          ) : !typing && step?.id === "submit" ? (
            <div className="space-y-2.5">
              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
              )}
              <button onClick={submitLead} disabled={submitting} className="btn btn-green w-full !py-3.5">
                {submitting ? (<><Loader2 size={18} className="animate-spin" /> Enviando...</>) : (<><Check size={18} /> Confirmar y enviar</>)}
              </button>
              <p className="text-[11px] text-ink/55 text-center leading-snug">
                Al confirmar autoriza a Realty Kings a contactarle sobre la oferta. Su información es confidencial.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );

  /* ---- Embedded card (lives inside the hero) ---- */
  if (!isFull) {
    return (
      <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5">
        <EmbeddedHeader progress={progress} remainingMinutes={remainingMinutes} />
        {conversation}
      </div>
    );
  }

  /* ---- Fullscreen page (/chat) ---- */
  return (
    <div className="fixed inset-0 bg-cream flex flex-col overflow-hidden">
      <FullHeader progress={progress} remainingMinutes={remainingMinutes} />
      <div className="flex-1 flex relative overflow-hidden min-h-0">
        <div className="flex-1 flex flex-col min-w-0">{conversation}</div>
        <SideRail stepIdx={stepIdx} remainingMinutes={remainingMinutes} />
      </div>
    </div>
  );
}

/* ============================================================
   Headers
   ============================================================ */
function EmbeddedHeader({ progress, remainingMinutes }: { progress: number; remainingMinutes: number }) {
  return (
    <div className="bg-blue-hero text-white flex-shrink-0">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-cash/60 p-1 flex-shrink-0">
          <Image src="/rk-monogram.png" alt="Realty Kings" width={40} height={40} className="object-contain w-full h-full" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-sm leading-tight">Asesor de Realty Kings</div>
          <div className="text-[11px] text-white/80 leading-tight flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brandgreen-light animate-pulse" />
            En línea · responde en segundos
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-[10px] uppercase tracking-wide text-white/70 font-bold">Oferta en</div>
          <div className="text-sm font-extrabold leading-none">24 h</div>
        </div>
      </div>
      <div className="h-[3px] bg-white/15">
        <div className="h-full bg-cash transition-all duration-500" style={{ width: `${Math.max(6, progress)}%` }} />
      </div>
    </div>
  );
}

function FullHeader({ progress, remainingMinutes }: { progress: number; remainingMinutes: number }) {
  return (
    <header className="bg-blue-hero text-white sticky top-0 z-10 flex-shrink-0">
      <div className="px-5 lg:px-8 py-4 flex items-center gap-4 max-w-7xl mx-auto">
        <Link href="/" className="text-white/70 hover:text-white transition"><ArrowLeft size={20} /></Link>
        <div className="flex items-center gap-3 flex-1">
          <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-cash/60 p-1.5">
            <Image src="/rk-monogram.png" alt="Realty Kings" width={48} height={48} className="object-contain w-full h-full" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-base leading-tight">Asesor de adquisiciones</div>
            <div className="text-[11px] text-white/80 leading-tight flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brandgreen-light animate-pulse" />
              Realty Kings · responde en segundos
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-white/80">
          <Clock size={12} /><span>~{remainingMinutes} min</span>
        </div>
      </div>
      <div className="h-[3px] bg-white/15">
        <div className="h-full bg-cash transition-all duration-500" style={{ width: `${Math.max(4, progress)}%` }} />
      </div>
    </header>
  );
}

/* ============================================================
   SideRail (fullscreen only)
   ============================================================ */
function SideRail({ stepIdx, remainingMinutes }: { stepIdx: number; remainingMinutes: number }) {
  const testimonials = [
    { img: "/photos/pr-home-row.jpg", quote: "Heredé una casa con techo malo. Realty Kings cerró en 11 días.", name: "María G.", municipio: "Carolina" },
    { img: "/photos/pr-coast-bldg2.jpg", quote: "Me mudaba a Florida. Vendí sin tener que volver para mostrarla.", name: "Carlos R.", municipio: "Dorado" },
    { img: "/photos/pr-home-beige.jpg", quote: "Atrasos de CRIM y dos herederos. Lo manejaron todo.", name: "Pedro M.", municipio: "Caguas" },
    { img: "/photos/pr-home-pink.jpg", quote: "Sin cartel, sin desconocidos. Profesional de inicio a fin.", name: "Lourdes R.", municipio: "Ponce" },
  ];
  const t = testimonials[Math.floor(stepIdx / 5) % testimonials.length];

  return (
    <aside className="hidden lg:flex w-80 flex-shrink-0 border-l border-ink/10 bg-cream-paper flex-col p-7 overflow-y-auto">
      <div className="card p-5 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={14} className="text-brandblue" />
          <span className="eyebrow-ink !text-[10px]">Tiempo estimado</span>
        </div>
        <div className="font-poster text-3xl mb-1">{remainingMinutes} <span className="text-base text-ink/50 font-sans normal-case">min</span></div>
        <div className="text-xs text-ink/60">Su oferta cash llega en 24 horas.</div>
      </div>

      <div className="card overflow-hidden mb-5">
        <div className="relative aspect-[4/3]">
          <Image src={t.img} alt="" fill className="object-cover" sizes="320px" />
          <div className="absolute inset-0 bg-gradient-to-t from-brandblue-ink/80 to-transparent" />
          <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-brandgreen text-white text-[10px] font-bold tracking-wide uppercase">Caso real</div>
        </div>
        <div className="p-5">
          <blockquote className="text-[15px] leading-snug mb-4 text-ink font-medium">“{t.quote}”</blockquote>
          <div className="flex items-center justify-between pt-3 border-t border-ink/10">
            <div><div className="text-xs font-bold">{t.name}</div><div className="eyebrow-ink !text-[9px]">{t.municipio}</div></div>
          </div>
        </div>
      </div>

      <div className="card p-5 mt-auto">
        <div className="flex items-start gap-3">
          <Shield size={16} className="text-brandblue mt-0.5" />
          <div>
            <div className="font-bold text-sm mb-1">100% Confidencial</div>
            <p className="text-xs text-ink/60 leading-relaxed">Su información se usa únicamente para preparar la oferta. No la compartimos con terceros.</p>
          </div>
        </div>
        <div className="h-px bg-ink/10 my-4" />
        <a href="tel:+17876679389" className="flex items-center gap-2 text-sm font-bold text-brandblue">
          <Phone size={13} /> 787-667-9389
        </a>
      </div>
    </aside>
  );
}

/* ============================================================
   Bubble / typing / input
   ============================================================ */
function Bubble({ role, content, big }: { role: "bot" | "user"; content: string; big?: boolean }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed
          ${role === "bot"
            ? `chat-bubble-bot rounded-tl-md ${big ? "text-[16px]" : "text-[15px]"}`
            : `chat-bubble-user rounded-tr-md ${big ? "text-[15px]" : "text-[14px]"}`
          }`}
      >
        {content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="chat-bubble-bot rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1">
        <span className="dot w-1.5 h-1.5 bg-brandblue/50 rounded-full inline-block" />
        <span className="dot w-1.5 h-1.5 bg-brandblue/50 rounded-full inline-block" />
        <span className="dot w-1.5 h-1.5 bg-brandblue/50 rounded-full inline-block" />
      </div>
    </div>
  );
}

function InputArea({ step, onAnswer, autoFocus = false }: { step: Step; onAnswer: (text: string, value: Answer) => void; autoFocus?: boolean }) {
  const [val, setVal] = useState("");

  if (step.type === "location") {
    return <LocationInput onAnswer={onAnswer} />;
  }

  if (step.type === "photos") {
    return <AttachmentInput imagesOnly onAnswer={onAnswer} />;
  }

  if (step.type === "files") {
    return <AttachmentInput imagesOnly={false} onAnswer={onAnswer} />;
  }

  if (step.type === "boolean") {
    return (
      <div className="flex gap-2">
        <button onClick={() => onAnswer((step as any).yes || "Sí", true)} className="flex-1 btn btn-blue !py-3">{(step as any).yes || "Sí"}</button>
        <button onClick={() => onAnswer((step as any).no || "No", false)} className="flex-1 btn btn-ghost !py-3">{(step as any).no || "No"}</button>
      </div>
    );
  }

  if (step.type === "choice") {
    return (
      <div className="space-y-2 max-h-[210px] overflow-y-auto chat-scroll pr-1">
        {(step as any).options.map((opt: string) => (
          <button key={opt} onClick={() => onAnswer(opt, opt)} className="w-full btn btn-ghost text-left justify-between !py-2.5">
            {opt} <ChevronRight size={14} />
          </button>
        ))}
      </div>
    );
  }

  if (step.type === "longtext") {
    return (
      <div className="space-y-2">
        <textarea value={val} onChange={(e) => setVal(e.target.value)} placeholder={(step as any).placeholder} rows={3} className="input w-full resize-none" autoFocus={autoFocus} />
        <button onClick={() => onAnswer(val || "(sin comentarios)", val)} className="btn btn-blue w-full">{val ? "Continuar" : "Saltar"} <ChevronRight size={14} /></button>
      </div>
    );
  }

  const inputType = step.type === "phone" ? "tel" : step.type === "email" ? "email" : step.type === "money" || step.type === "number" ? "number" : "text";
  const placeholder = (step as any).placeholder || "Escriba su respuesta...";
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
      className="flex gap-2 relative"
    >
      {step.type === "money" && (<div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink/50">$</div>)}
      <input
        type={inputType}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className={`input flex-1 ${step.type === "money" ? "pl-7" : ""}`}
        autoFocus={autoFocus}
        inputMode={step.type === "number" || step.type === "money" ? "numeric" : undefined}
      />
      <button type="submit" disabled={required && !val.trim()} className="btn btn-blue px-5 disabled:opacity-40 disabled:cursor-not-allowed"><Send size={16} /></button>
    </form>
  );
}

/* ============================================================
   Attachment input — drag & drop, multiple images or files
   ============================================================ */
function AttachmentInput({ imagesOnly, onAnswer }: { imagesOnly: boolean; onAnswer: (t: string, v: Answer) => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const accept = imagesOnly ? "image/*" : "image/*,application/pdf,.pdf,.doc,.docx,.heic";
  const noun = imagesOnly ? "foto" : "archivo";

  const add = (list: FileList | null) => {
    if (!list) return;
    setFiles((p) => [...p, ...Array.from(list)].slice(0, 15));
  };

  return (
    <div className="space-y-3">
      {files.length > 0 && (imagesOnly ? (
        <div className="grid grid-cols-4 gap-2">
          {files.map((f, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-ink/5">
              <img src={URL.createObjectURL(f)} alt={f.name} className="absolute inset-0 w-full h-full object-cover" />
              <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"><X size={11} /></button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-1.5 max-h-[160px] overflow-y-auto chat-scroll">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm bg-ink/5 rounded-lg px-3 py-2">
              <FileText size={15} className="text-brandblue flex-shrink-0" />
              <span className="flex-1 truncate">{f.name}</span>
              <span className="text-[11px] text-ink/40 flex-shrink-0">{(f.size / 1024).toFixed(0)} KB</span>
              <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="p-0.5 flex-shrink-0"><X size={13} /></button>
            </div>
          ))}
        </div>
      ))}

      <label
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-xl py-4 px-3 cursor-pointer transition text-center ${drag ? "border-brandblue bg-brandblue-50" : "border-ink/15 hover:border-brandblue/50 hover:bg-ink/[0.02]"}`}
      >
        {imagesOnly ? <Camera size={18} className="text-brandblue" /> : <Paperclip size={18} className="text-brandblue" />}
        <span className="text-sm font-semibold">
          {files.length > 0 ? "Agregar más" : imagesOnly ? "Arrastra o toca para subir fotos" : "Arrastra o toca para subir archivos"}
        </span>
        <span className="text-[11px] text-ink/45">
          {imagesOnly ? "Varias imágenes a la vez" : "Imágenes, PDF, Word — varios a la vez"}
        </span>
        <input type="file" accept={accept} multiple capture={imagesOnly ? "environment" : undefined} className="hidden"
          onChange={(e) => add(e.target.files)} />
      </label>

      <button
        onClick={() => onAnswer(files.length > 0 ? `${files.length} ${noun}${files.length !== 1 ? "s" : ""} adjunto${files.length !== 1 ? "s" : ""}` : "Sin adjuntos por ahora", files)}
        className="btn btn-blue w-full"
      >
        {files.length > 0 ? "Listo" : "Saltar"} <ChevronRight size={14} />
      </button>
    </div>
  );
}

/* ============================================================
   Location input — GPS share + Google Maps link fallback
   ============================================================ */
function LocationInput({ onAnswer }: { onAnswer: (t: string, v: Answer) => void }) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mapsUrl, setMapsUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function share() {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setErr("Tu navegador no permite compartir ubicación. Pega un enlace de Google Maps.");
      return;
    }
    setLoading(true);
    setErr(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: +pos.coords.latitude.toFixed(6), lng: +pos.coords.longitude.toFixed(6) });
        setLoading(false);
      },
      () => {
        setErr("No pudimos obtener tu ubicación. Puedes pegar un enlace de Google Maps.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function submit() {
    const value: LocationVal = { lat: coords?.lat, lng: coords?.lng, mapsUrl: mapsUrl.trim() || undefined };
    const text = coords ? "📍 Ubicación GPS compartida" : mapsUrl.trim() ? "📍 Enlace de mapa compartido" : "Sin ubicación por ahora";
    onAnswer(text, value);
  }

  return (
    <div className="space-y-2.5">
      <button onClick={share} disabled={loading} className="btn btn-blue w-full disabled:opacity-60">
        {loading ? (<><Loader2 size={15} className="animate-spin" /> Obteniendo ubicación...</>)
          : coords ? (<><Check size={15} /> Ubicación capturada</>)
          : (<><Navigation size={15} /> Compartir mi ubicación</>)}
      </button>
      {coords && (
        <div className="text-xs text-brandgreen-dark flex items-center gap-1">
          <MapPin size={12} /> {coords.lat}, {coords.lng}
        </div>
      )}
      {err && <div className="text-xs text-red-600">{err}</div>}
      <input value={mapsUrl} onChange={(e) => setMapsUrl(e.target.value)} placeholder="O pega un enlace de Google Maps (opcional)" className="input w-full text-sm" />
      <button onClick={submit} className="btn btn-ghost w-full">
        {coords || mapsUrl.trim() ? "Continuar" : "Saltar"} <ChevronRight size={14} />
      </button>
    </div>
  );
}

/* ============================================================
   Helpers
   ============================================================ */
function extractMunicipality(address: string): string {
  const parts = address.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 3) return parts[parts.length - 2];
  if (parts.length >= 2) return parts[parts.length - 1];
  return "";
}

function buildNotes(a: Record<string, Answer>, extra?: { documentUrls?: string[]; loc?: LocationVal | null }): string {
  const lines: string[] = [];
  if (a.reason) lines.push(`Razón para vender: ${a.reason}`);
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
  if (extra?.loc) {
    const p: string[] = [];
    if (extra.loc.lat != null && extra.loc.lng != null) p.push(`GPS ${extra.loc.lat}, ${extra.loc.lng} → https://maps.google.com/?q=${extra.loc.lat},${extra.loc.lng}`);
    if (extra.loc.mapsUrl) p.push(`Maps: ${extra.loc.mapsUrl}`);
    if (p.length) lines.push(`Ubicación: ${p.join(" | ")}`);
  }
  if (extra?.documentUrls?.length) lines.push(`Documentos adjuntos (${extra.documentUrls.length}):\n${extra.documentUrls.join("\n")}`);
  if (a.comments) lines.push(`---\nComentarios del vendedor:\n${a.comments}`);
  return lines.join("\n");
}

function cleanForJSON(a: Record<string, Answer>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(a)) {
    if (Array.isArray(v)) continue;
    out[k] = v;
  }
  return out;
}
