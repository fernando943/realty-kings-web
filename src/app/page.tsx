"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Phone, Menu, X, Check, ChevronDown, ChevronRight, MapPin, Mail,
  ScrollText, Home, Gavel, Clock, HeartCrack, Wrench,
  MessageCircle, Banknote, Handshake, ShieldCheck, Star,
} from "lucide-react";
import { ChatFunnel } from "@/components/ChatFunnel";

const PHONE = "787-667-9389";
const PHONE_TEL = "+17876679389";
const PHONE_HERENCIAS = "787-667-4033";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <Hero />
      <QueCompramos />
      <ComoFunciona />
      <TrustBand />
      <Testimonios />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ============================================================
   HEADER
   ============================================================ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2.5" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-10">
          <Image src="/rk-logo.png" alt="Realty Kings" width={150} height={100}
            className={`object-contain w-auto transition-all ${scrolled ? "h-9" : "h-11"} ${scrolled ? "" : "drop-shadow-lg"}`} priority />
        </Link>

        <nav className={`hidden lg:flex items-center gap-8 text-sm font-semibold ${scrolled ? "text-ink" : "text-white"}`}>
          <a href="#compramos" className="hover:text-cash transition">Qué compramos</a>
          <a href="#proceso" className="hover:text-cash transition">Cómo funciona</a>
          <a href="#preguntas" className="hover:text-cash transition">Preguntas</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <a href={`tel:${PHONE_TEL}`}
            className={`hidden sm:flex items-center gap-2 font-extrabold text-sm px-3.5 py-2 rounded-full transition
              ${scrolled ? "text-brandblue hover:bg-brandblue-50" : "text-white hover:bg-white/10"}`}>
            <Phone size={15} /> {PHONE}
          </a>
          <a href="#chat" className="hidden sm:inline-flex btn btn-green !py-2 !px-4 text-sm">Vender mi casa</a>
          <button onClick={() => setOpen(true)} className={`lg:hidden p-2 -mr-1 ${scrolled ? "text-ink" : "text-white"}`} aria-label="Menú">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-blue-hero text-white px-6 py-6 animate-fade-in">
          <div className="flex items-center justify-between mb-10">
            <Image src="/rk-logo.png" alt="Realty Kings" width={150} height={100} className="h-10 w-auto object-contain" />
            <button onClick={() => setOpen(false)} className="p-2 -mr-2"><X size={24} /></button>
          </div>
          <nav className="flex flex-col gap-6 text-2xl font-poster">
            <a href="#compramos" onClick={() => setOpen(false)}>Qué compramos</a>
            <a href="#proceso" onClick={() => setOpen(false)}>Cómo funciona</a>
            <a href="#preguntas" onClick={() => setOpen(false)}>Preguntas</a>
          </nav>
          <div className="mt-10 space-y-3">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-green w-full"><Phone size={18} /> {PHONE}</a>
            <a href="#chat" onClick={() => setOpen(false)} className="btn btn-yellow w-full">Vender mi casa <ChevronRight size={16} /></a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO — bold copy + embedded chat
   ============================================================ */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-blue-hero text-white">
      {/* textures */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(247,181,0,0.22) 0%, transparent 65%)" }} />
      {/* faded house photo bottom-left for depth */}
      <div className="absolute bottom-0 left-0 w-full h-40 opacity-[0.12] pointer-events-none">
        <Image src="/photos/pr-home-greenwhite.jpg" alt="" fill className="object-cover object-top" sizes="100vw" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-28 lg:pt-32 pb-14 lg:pb-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT — the pitch */}
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/12 border border-white/20 rounded-full px-3 py-1.5">
              🇵🇷 Especialistas en Puerto Rico
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-brandred rounded-full px-3 py-1.5 uppercase tracking-wide">
              Recibe dinero rápido
            </span>
          </div>

          <h1 className="font-poster poster-xl mb-3 [text-shadow:0_3px_24px_rgba(0,0,0,0.35)]">
            Compramos casas <span className="text-cash">cash</span>
          </h1>
          <div className="font-poster poster-md mb-6">
            <span className="hl-green">En todo Puerto Rico</span>
          </div>

          <p className="text-lg text-white/85 max-w-lg mb-7 leading-relaxed">
            Te compramos tu propiedad <strong className="text-white">en cualquier condición</strong> — herencias, atrasos,
            ejecuciones, mudanzas. Sin comisiones, sin reparaciones. Cierra en <strong className="text-cash">7 días</strong>.
          </p>

          {/* three green checks */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
            <span className="check-chip text-white"><span className="ck"><Check size={15} strokeWidth={3} /></span> Cierre rápido</span>
            <span className="check-chip text-white"><span className="ck"><Check size={15} strokeWidth={3} /></span> Sin reparaciones</span>
            <span className="check-chip text-white"><span className="ck"><Check size={15} strokeWidth={3} /></span> Sin comisiones</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-yellow !py-4 !px-7 text-base animate-pulse-gold">
              <Phone size={18} /> Llama hoy: {PHONE}
            </a>
            <div className="seal w-[86px] h-[86px] flex-shrink-0">
              <div className="font-poster text-3xl text-cash leading-none">20</div>
              <div className="text-[8px] font-extrabold tracking-wide leading-tight mt-0.5">AÑOS DE<br />EXPERIENCIA</div>
            </div>
          </div>
        </div>

        {/* RIGHT — the chat (the whole point) */}
        <div id="chat" className="scroll-mt-24 animate-fade-up delay-200">
          <div className="flex items-center gap-2 mb-2.5 text-sm font-bold text-cash">
            <span className="inline-block w-2 h-2 rounded-full bg-brandgreen-light animate-pulse" />
            Empieza aquí — cuéntanos de tu propiedad 👇
          </div>
          <div className="h-[560px] sm:h-[600px]">
            <ChatFunnel variant="embedded" />
          </div>
          <p className="text-center text-xs text-white/70 mt-2.5">
            Gratis y confidencial · Oferta cash en 24 horas · Sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   QUÉ COMPRAMOS — category cards
   ============================================================ */
function QueCompramos() {
  const cats = [
    { icon: ScrollText, color: "bg-brandblue text-white", title: "Herencias", desc: "Sucesiones, múltiples herederos, sin declaración." },
    { icon: Home, color: "bg-brandgreen text-white", title: "Casas abandonadas", desc: "Propiedades vacías o en deterioro. Las compramos tal como están." },
    { icon: Gavel, color: "bg-brandred text-white", title: "Ejecuciones hipotecarias", desc: "¿En proceso de foreclosure? Actuamos rápido." },
    { icon: Clock, color: "bg-cash text-brandblue-ink", title: "Atrasos", desc: "CRIM, hipoteca, LUMA, patentes. Nos encargamos." },
    { icon: HeartCrack, color: "bg-brandblue text-white", title: "Divorcios", desc: "Venta rápida y discreta. Sin cartel, sin exhibiciones." },
    { icon: Wrench, color: "bg-brandgreen text-white", title: "Propiedades con problemas", desc: "Daños, filtraciones, problemas estructurales o legales." },
  ];
  return (
    <section id="compramos" className="bg-cream py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow mb-3">Qué compramos</div>
          <h2 className="font-poster poster-lg text-ink">
            Si tienes una casa, <span className="text-brandblue">te la compramos</span>
          </h2>
          <p className="text-ink/60 mt-4 text-lg">No importa la condición ni la situación. Compramos cash, tal como está.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="cat-card">
                <div className={`cat-ico ${c.color} mb-4`}><Icon size={26} strokeWidth={2.2} /></div>
                <h3 className="font-poster text-xl text-ink mb-1.5">{c.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-11">
          <a href="#chat" className="btn btn-blue !py-4 !px-8 text-base">
            Cuéntanos de tu propiedad <ChevronRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CÓMO FUNCIONA — 3 steps
   ============================================================ */
function ComoFunciona() {
  const steps = [
    { n: "1", icon: MessageCircle, title: "Cuéntanos", body: "Contesta unas preguntas en el chat — 5 minutos. Confidencial y sin compromiso.", time: "5 minutos" },
    { n: "2", icon: Banknote, title: "Recibe tu oferta", body: "Nuestro equipo analiza tu propiedad y te llama con una oferta cash justa.", time: "En 24 horas" },
    { n: "3", icon: Handshake, title: "Cobra y cierra", body: "Firmamos con un notario y recibes tu dinero. Cheque de gerente o transferencia.", time: "7 a 14 días" },
  ];
  return (
    <section id="proceso" className="relative bg-blue-hero text-white py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow !text-cash mb-3">Cómo funciona</div>
          <h2 className="font-poster poster-lg">Vender tu casa nunca fue <span className="text-cash">tan fácil</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative bg-white/8 border border-white/15 rounded-2xl p-7 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-cash text-brandblue-ink flex items-center justify-center font-poster text-2xl">{s.n}</div>
                  <Icon size={24} className="text-cash" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wide text-cash mb-1.5">{s.time}</div>
                <h3 className="font-poster text-2xl mb-2">{s.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{s.body}</p>
                {i < 2 && <ChevronRight className="hidden md:block absolute top-1/2 -right-5 text-cash/50" size={26} />}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a href="#chat" className="btn btn-yellow !py-4 !px-8 text-base">Empezar ahora <ChevronRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TRUST BAND
   ============================================================ */
function TrustBand() {
  const stats = [
    { n: "+20", l: "Años de experiencia" },
    { n: "300+", l: "Casas compradas" },
    { n: "7 días", l: "Cierre más rápido" },
    { n: "$0", l: "Comisiones" },
  ];
  return (
    <section className="bg-cream py-14">
      <div className="max-w-6xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-poster poster-md text-brandblue">{s.n}</div>
              <div className="text-sm font-semibold text-ink/60 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIOS
   ============================================================ */
function Testimonios() {
  const items = [
    { quote: "Heredé una casa de mi papá en Carolina con el techo malo y dos años de atraso en CRIM. Realty Kings la compró tal como estaba y cerramos en 11 días.", name: "María González", municipio: "Carolina", img: "/photos/pr-home-row.jpg" },
    { quote: "Después de un divorcio necesitaba vender rápido y discreto. Sin cartel, sin desconocidos. La oferta fue justa y el cheque llegó en 9 días.", name: "Roberto Cruz", municipio: "Bayamón", img: "/photos/pr-home-greenwhite.jpg" },
    { quote: "Me mudaba a Florida y la casa de Caguas quedaba vacía. Me ahorraron meses de proceso. Profesionales de principio a fin.", name: "Lourdes Rivera", municipio: "Caguas", img: "/photos/pr-home-beige.jpg" },
  ];
  return (
    <section className="bg-cream-paper py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow mb-3">Testimonios</div>
          <h2 className="font-poster poster-lg text-ink">Lo que dicen <span className="text-brandblue">nuestros vendedores</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <figure key={i} className="card p-6 flex flex-col">
              <div className="flex gap-0.5 mb-3 text-cash">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={16} fill="currentColor" strokeWidth={0} />)}
              </div>
              <blockquote className="text-ink/80 leading-relaxed mb-6 flex-1">“{t.quote}”</blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-ink/10">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-ink/5 flex-shrink-0">
                  <Image src={t.img} alt={t.name} fill className="object-cover" sizes="44px" />
                </div>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-ink/50 flex items-center gap-1"><MapPin size={11} /> {t.municipio}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function FAQ() {
  const items = [
    { q: "¿Cobran comisiones o cargos?", a: "No. El monto que acordamos es el monto que recibes. Sin comisiones de corredor, sin honorarios escondidos. Los costos de cierre se discuten transparentemente desde la primera llamada." },
    { q: "¿En qué condición tiene que estar la casa?", a: "Cualquiera. Compramos casas con reparaciones mayores, problemas estructurales, atrasos de CRIM o LUMA, herencias sin declaración, ejecuciones. Si un banco la rechazó, probablemente nosotros la compramos." },
    { q: "¿Cuánto tiempo toma?", a: "Oferta cash en 24 horas tras la consulta. Cierre completo en 7 a 14 días, dependiendo de la documentación. Hemos cerrado casos en menos de 8 días cuando hay urgencia." },
    { q: "¿Tengo que limpiar o arreglar algo?", a: "No. Compramos la propiedad tal como está. Puedes dejar muebles, escombros o pertenencias que no quieras llevarte. Nosotros nos encargamos de todo lo demás." },
  ];
  return (
    <section id="preguntas" className="bg-cream py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-10">
          <div className="eyebrow mb-3">Preguntas frecuentes</div>
          <h2 className="font-poster poster-lg text-ink">Respuestas claras</h2>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => <FAQItem key={i} q={it.q} a={it.a} />)}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left">
        <span className="font-bold text-ink pr-2">{q}</span>
        <ChevronDown size={20} className={`flex-shrink-0 text-brandblue transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 -mt-1 text-ink/70 leading-relaxed text-[15px] animate-fade-in">{a}</div>}
    </div>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function FinalCTA() {
  return (
    <section className="relative bg-blue-deep text-white py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(247,181,0,0.18) 0%, transparent 65%)" }} />
      <div className="relative max-w-3xl mx-auto px-5 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold bg-brandred rounded-full px-4 py-1.5 uppercase tracking-wide mb-6">
          <ShieldCheck size={14} /> Oferta cash · sin compromiso
        </div>
        <h2 className="font-poster poster-lg mb-5">
          ¿Listo para vender tu casa <span className="text-cash">cash</span>?
        </h2>
        <p className="text-lg text-white/80 mb-9 max-w-xl mx-auto">
          Contesta el chat en 5 minutos y recibe tu oferta en 24 horas. O llámanos ahora mismo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#chat" className="btn btn-yellow !py-4 !px-9 text-base">Empezar chat <ChevronRight size={17} /></a>
          <a href={`tel:${PHONE_TEL}`} className="btn btn-green !py-4 !px-9 text-base"><Phone size={17} /> {PHONE}</a>
        </div>
        <p className="text-sm text-white/55 mt-7">Atendido por equipo local · Español e inglés · +20 años en Puerto Rico</p>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-brandblue-ink text-white py-14">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <Image src="/rk-logo.png" alt="Realty Kings" width={160} height={110} className="h-12 w-auto object-contain mb-4" />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Compramos casas cash en todo Puerto Rico, en cualquier condición. +20 años comprando propiedades.
            </p>
          </div>

          <div>
            <div className="eyebrow !text-cash mb-4">Contacto</div>
            <div className="space-y-2.5 text-sm">
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 text-white/80 hover:text-cash transition font-semibold">
                <Phone size={14} /> {PHONE} <span className="text-white/40 font-normal">· principal</span>
              </a>
              <a href="tel:+17876674033" className="flex items-center gap-2 text-white/80 hover:text-cash transition font-semibold">
                <Phone size={14} /> {PHONE_HERENCIAS} <span className="text-white/40 font-normal">· herencias</span>
              </a>
              <a href="mailto:realtykingspr@gmail.com" className="flex items-center gap-2 text-white/80 hover:text-cash transition">
                <Mail size={14} /> realtykingspr@gmail.com
              </a>
              <div className="flex items-center gap-2 text-white/60"><MapPin size={14} /> Puerto Rico</div>
            </div>
          </div>

          <div>
            <div className="eyebrow !text-cash mb-4">Dónde compramos</div>
            <p className="text-sm text-white/60 leading-relaxed">
              San Juan · Bayamón · Carolina · Caguas · Guaynabo · Ponce · Mayagüez · Dorado · Toa Baja · Toa Alta · Trujillo Alto · y toda la isla.
            </p>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <div>© {new Date().getFullYear()} Realty Kings Properties. Todos los derechos reservados.</div>
          <div>Compramos cash · Sin comisiones · Español e inglés</div>
        </div>
      </div>
    </footer>
  );
}
