"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, Check, ChevronDown, ScrollText, Users, Clock, Gavel, ShieldCheck } from "lucide-react";
import { ChatFunnel } from "@/components/ChatFunnel";
import { track } from "@vercel/analytics";

const PHONE_HERENCIAS = "787-667-4033";
const TEL = "+17876674033";
const WHATSAPP = "https://wa.me/17876674033?text=" + encodeURIComponent("Hola, heredé una propiedad en Puerto Rico y quiero venderla.");

export function HerenciasContent() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-[#b31217] text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/rk-logo.png" alt="Realty Kings" width={150} height={100} className="h-9 w-auto object-contain" priority />
          </Link>
          <a href={`tel:${TEL}`} onClick={() => track("tel_click", { location: "herencias_header" })} className="flex items-center gap-2 font-extrabold text-sm">
            <Phone size={15} /> {PHONE_HERENCIAS}
          </a>
        </div>
      </header>

      {/* Hero — red herencias theme */}
      <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg,#e11d1d 0%,#b31217 55%,#7a0c0f 100%)" }}>
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-10 pb-14 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold bg-cash text-brandblue-ink rounded-full px-3 py-1.5 uppercase tracking-wide mb-5">
              🇵🇷 #1 en Herencias · +20 años
            </span>
            <h1 className="font-poster poster-xl mb-3 [text-shadow:0_3px_24px_rgba(0,0,0,0.35)]">
              ¿Heredaste una <span className="text-cash">casa</span>?
            </h1>
            <div className="font-poster poster-md mb-6"><span className="hl-green">Te la compramos cash</span></div>
            <p className="text-lg text-white/90 max-w-lg mb-7 leading-relaxed">
              Compramos propiedades heredadas en todo Puerto Rico — <strong className="text-white">sucesiones, múltiples herederos, sin declaratoria, con deudas de CRIM</strong>. Nosotros manejamos el proceso legal. Sin comisiones, sin reparaciones.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
              {["Manejamos la sucesión", "Aunque haya varios herederos", "Aunque deba CRIM"].map((t) => (
                <span key={t} className="check-chip text-white"><span className="ck"><Check size={15} strokeWidth={3} /></span> {t}</span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`tel:${TEL}`} onClick={() => track("tel_click", { location: "herencias_hero" })} className="btn btn-yellow !py-4 !px-7 text-base animate-pulse-gold">
                <Phone size={18} /> Llama: {PHONE_HERENCIAS}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { location: "herencias_hero" })} className="btn btn-green !py-4 !px-7 text-base">
                WhatsApp
              </a>
            </div>
          </div>

          <div id="chat" className="scroll-mt-24 animate-fade-up delay-200">
            <div className="flex items-center gap-2 mb-2.5 text-sm font-bold text-cash">
              <span className="inline-block w-2 h-2 rounded-full bg-brandgreen-light animate-pulse" />
              Cuéntanos de la propiedad heredada 👇
            </div>
            <div className="h-[560px] sm:h-[600px]"><ChatFunnel variant="embedded" /></div>
            <p className="text-center text-xs text-white/80 mt-2.5">Gratis y confidencial · Oferta cash en 24 horas</p>
          </div>
        </div>
      </section>

      {/* Situations */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-11">
            <div className="eyebrow !text-brandred mb-3">Casos de herencia que resolvemos</div>
            <h2 className="font-poster poster-lg text-ink">No importa lo complicado que parezca</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: ScrollText, t: "Sin declaratoria de herederos", d: "Te orientamos y coordinamos el proceso legal." },
              { icon: Users, t: "Múltiples herederos", d: "Aunque los herederos no se pongan de acuerdo o vivan fuera de PR." },
              { icon: Clock, t: "Atrasos de CRIM", d: "Compramos con las deudas incluidas — se ajustan en el cierre." },
              { icon: Gavel, t: "Propiedad en sucesión", d: "Aunque el caso aún esté abierto en el tribunal." },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.t} className="cat-card">
                  <div className="cat-ico bg-[#b31217] text-white mb-4"><Icon size={24} strokeWidth={2.2} /></div>
                  <h3 className="font-poster text-lg text-ink mb-1.5">{c.t}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{c.d}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <a href="#chat" className="btn btn-red !py-4 !px-8 text-base">Cuéntanos tu caso <ChevronDown size={17} /></a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-paper py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <div className="eyebrow !text-brandred mb-3">Preguntas sobre herencias</div>
            <h2 className="font-poster poster-lg text-ink">Respuestas claras</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "¿Puedo vender si la casa todavía está a nombre del difunto?", a: "Sí. Trabajamos con casos en sucesión y te orientamos sobre la declaratoria de herederos. Coordinamos con el notario todo el proceso." },
              { q: "Somos varios herederos, ¿cómo funciona?", a: "Compramos con la firma de todos los herederos (o sus representantes). Manejamos la logística aunque vivan fuera de Puerto Rico." },
              { q: "La casa debe CRIM y otras deudas. ¿Igual la compran?", a: "Sí. Las deudas de CRIM, hipoteca o LUMA se ajustan transparentemente en el cierre. Recibes el neto." },
              { q: "¿Cuánto tardan?", a: "Oferta cash en 24 horas. El cierre depende del estado de la sucesión — desde 7 días si la documentación está lista." },
            ].map((it, i) => <FAQItem key={i} {...it} />)}
          </div>
          <div className="text-center mt-10 text-sm text-ink/60">
            ¿Prefieres hablar? <a href={`tel:${TEL}`} onClick={() => track("tel_click", { location: "herencias_faq" })} className="link-gold text-ink font-bold">{PHONE_HERENCIAS}</a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-white py-16" style={{ background: "linear-gradient(135deg,#b31217,#7a0c0f)" }}>
        <div className="max-w-3xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold bg-cash text-brandblue-ink rounded-full px-4 py-1.5 uppercase tracking-wide mb-6">
            <ShieldCheck size={14} /> Confidencial · Sin compromiso
          </div>
          <h2 className="font-poster poster-lg mb-5">¿Listo para vender la <span className="text-cash">herencia</span>?</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#chat" className="btn btn-yellow !py-4 !px-9 text-base">Empezar chat</a>
            <a href={`tel:${TEL}`} onClick={() => track("tel_click", { location: "herencias_final" })} className="btn btn-green !py-4 !px-9 text-base"><Phone size={17} /> {PHONE_HERENCIAS}</a>
          </div>
        </div>
      </section>

      <a href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { location: "herencias_float" })} aria-label="WhatsApp" className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:scale-105 transition">
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.6.7.7-3.5-.2-.4c-1-1.6-1.5-3.4-1.5-5.3C6 9.9 10.5 5.5 16 5.5S26 9.9 26 15.4 21.5 24.8 16 24.8zm5.5-6.9c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2.6 1.1 3.1.9 3.7.8.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.5-.3z" /></svg>
      </a>
    </main>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left">
        <span className="font-bold text-ink pr-2">{q}</span>
        <ChevronDown size={20} className={`flex-shrink-0 text-brandred transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 -mt-1 text-ink/70 leading-relaxed text-[15px] animate-fade-in">{a}</div>}
    </div>
  );
}
