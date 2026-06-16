"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone, Mail, MessageCircle, CheckCircle2, Shield, Clock, DollarSign,
  Home, Wrench, FileText, Send, Sparkles, ChevronDown
} from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafaf7]">
      <Header />
      <Hero />
      <ValueProps />
      <Process />
      <AboutSection />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/rk-logo.jpg" alt="Realty Kings" width={120} height={50} className="object-contain" priority />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/90">
          <a href="#proceso" className="hover:text-gold-300 transition">Cómo funciona</a>
          <a href="#sobre" className="hover:text-gold-300 transition">Nosotros</a>
          <a href="#preguntas" className="hover:text-gold-300 transition">Preguntas</a>
          <a href="tel:+17879460003" className="hover:text-gold-300 transition flex items-center gap-1.5">
            <Phone size={14} /> 787-946-0003
          </a>
        </nav>
        <Link href="/chat" className="btn btn-gold text-sm py-2 px-5">
          Empezar
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative bg-hero-radial text-white overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32">
      {/* Decorative gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold-300 text-xs uppercase tracking-wider mb-8">
          <Sparkles size={12} /> Puerto Rico · Cash en 14 días
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] mb-6">
          Vendemos tu propiedad
          <br />
          <span className="text-gold-shimmer italic">rápido y sin estrés</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Compramos casas en cualquier condición en Puerto Rico. Sin comisiones, sin reparaciones, sin inspecciones complicadas. Recibe una oferta justa en menos de 24 horas.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/chat" className="btn btn-gold text-base px-8 py-4 animate-pulse-gold">
            <MessageCircle size={18} /> Empezar conversación
          </Link>
          <a href="tel:+17879460003" className="btn btn-ghost text-base px-8 py-4 !text-white !border-white/20 hover:!bg-white/5">
            <Phone size={16} /> 787-946-0003
          </a>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-white/60">
          <Stat number="500+" label="Propiedades cerradas" />
          <Stat number="14 días" label="Cierre promedio" />
          <Stat number="$0" label="Comisiones" />
          <Stat number="24h" label="Oferta inicial" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl md:text-3xl text-gold-shimmer font-semibold">{number}</div>
      <div className="text-xs uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function ValueProps() {
  const items = [
    {
      icon: DollarSign,
      title: "Sin comisiones",
      text: "Tú recibes el 100% del precio acordado. Sin agentes, sin honorarios escondidos.",
    },
    {
      icon: Wrench,
      title: "Cualquier condición",
      text: "Compramos casas que necesitan reparaciones, con problemas legales, herencias o atrasos en CRIM.",
    },
    {
      icon: Clock,
      title: "Cierre en 14 días",
      text: "Oferta en 24 horas. Cierre completo en menos de dos semanas cuando la documentación esté lista.",
    },
    {
      icon: Shield,
      title: "Proceso transparente",
      text: "Cada paso explicado, cada documento revisado por abogado. Tú decides al ver la oferta.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
      <div className="text-center mb-14">
        <div className="text-xs uppercase tracking-wider text-gold-600 mb-3">Por qué Realty Kings</div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold">
          La forma <span className="text-gold-shimmer italic">más simple</span> de vender en PR
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.title} className="card p-7 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
              <it.icon size={22} className="text-gold-600" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{it.title}</h3>
            <p className="text-sm text-ink/70 leading-relaxed">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      title: "Cuéntanos de tu propiedad",
      text: "Conversa con nuestro asistente. Te haremos las preguntas necesarias en 5 minutos. Sube fotos si las tienes a mano.",
    },
    {
      n: "02",
      title: "Recibe una oferta en 24 horas",
      text: "Analizamos tu propiedad y te llamamos con una oferta justa basada en el mercado actual de Puerto Rico.",
    },
    {
      n: "03",
      title: "Cierra y recibe el dinero",
      text: "Coordinamos cierre con un abogado de tu confianza. En 14 días o menos, el dinero está en tu cuenta.",
    },
  ];

  return (
    <section id="proceso" className="bg-ink text-white py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-wider text-gold-400 mb-3">El proceso</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">
            3 pasos, <span className="text-gold-shimmer italic">cero complicaciones</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="font-display text-7xl text-gold-shimmer font-bold leading-none mb-4 opacity-80">{s.n}</div>
              <h3 className="font-display text-2xl font-semibold mb-3">{s.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{s.text}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-12 -right-6 text-gold-400 opacity-30">
                  <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                    <path d="M0 10 L25 10 M20 4 L26 10 L20 16" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/chat" className="btn btn-gold text-base px-8 py-4">
            <MessageCircle size={18} /> Empezar ahora
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-wider text-gold-600 mb-3">Sobre nosotros</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Una empresa boricua. <br />
            <span className="text-gold-shimmer italic">Resultados reales.</span>
          </h2>
          <div className="space-y-4 text-ink/75 leading-relaxed">
            <p>
              Realty Kings es una empresa de inversión inmobiliaria con base en Puerto Rico.
              Especializados en compras directas de propiedades residenciales y comerciales,
              ofrecemos a propietarios una alternativa rápida, justa y libre de las complicaciones
              de un proceso tradicional de venta.
            </p>
            <p>
              Trabajamos con propiedades en cualquier condición — desde casas listas para mudarse hasta
              estructuras que necesitan rehabilitación completa. Nuestro equipo evalúa cada propiedad
              individualmente y presenta una oferta justa basada en datos del mercado local.
            </p>
            <p>
              <strong>No somos corredores ni intermediarios.</strong> Somos los compradores directos.
              Eso significa cero comisiones, cero esperar a que aparezca un comprador, cero negociaciones
              sin fin.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="border-l-2 border-gold pl-4">
              <div className="font-display text-3xl text-gold-shimmer font-semibold">2018</div>
              <div className="text-xs uppercase tracking-wider text-ink/60 mt-1">Año de fundación</div>
            </div>
            <div className="border-l-2 border-gold pl-4">
              <div className="font-display text-3xl text-gold-shimmer font-semibold">100%</div>
              <div className="text-xs uppercase tracking-wider text-ink/60 mt-1">Capital local</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-ink to-gold-900 flex items-center justify-center p-12 shadow-2xl">
            <Image
              src="/rk-logo.jpg"
              alt="Realty Kings"
              width={400}
              height={300}
              className="object-contain w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 max-w-xs">
            <div className="text-xs uppercase tracking-wider text-gold-600 mb-1">Contacto directo</div>
            <a href="tel:+17879460003" className="font-display text-2xl font-semibold block">787-946-0003</a>
            <a href="mailto:realtykingspr@gmail.com" className="text-xs text-ink/60 hover:text-gold-600">
              realtykingspr@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote: "Heredé una casa con problemas de CRIM y techo malo. Realty Kings me hizo oferta y cerramos en 12 días. Sin tener que arreglar nada.",
      name: "María González",
      location: "Bayamón",
    },
    {
      quote: "Tres bancos me rechazaron por la condición de la casa. Realty Kings la compró tal cual, sin pedir reparaciones.",
      name: "Roberto Cruz",
      location: "Carolina",
    },
    {
      quote: "El proceso fue transparente desde la primera llamada. La oferta fue justa y el cierre rápido. Cero estrés.",
      name: "Lourdes Rivera",
      location: "Caguas",
    },
  ];
  return (
    <section className="bg-ink/5 py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-wider text-gold-600 mb-3">Testimonios</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">
            Lo que dicen <span className="text-gold-shimmer italic">nuestros clientes</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="card p-7">
              <div className="text-4xl text-gold/40 font-display leading-none mb-2">"</div>
              <p className="text-ink/80 leading-relaxed mb-6 italic">{t.quote}</p>
              <div className="border-t border-ink/10 pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-ink/60">{t.location}, Puerto Rico</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "¿Cobran comisiones o cargos?",
      a: "No. El precio que te ofrecemos es el precio que recibes. Sin comisiones de corredor, sin cargos administrativos. Los costos de cierre (escritura, registro) se manejan según acuerdo.",
    },
    {
      q: "¿En qué condiciones compran propiedades?",
      a: "Cualquier condición. Casas para arreglar, con problemas de techo, plomería, eléctrico, CRIM atrasado, herencias sin documentar, divorcios pendientes — lo hemos visto todo.",
    },
    {
      q: "¿Cuánto tiempo toma todo el proceso?",
      a: "Oferta inicial: 24 horas. Cierre completo: 14 días promedio, depende de la documentación y si necesita estudio de título.",
    },
    {
      q: "¿Tengo que limpiar o arreglar algo antes?",
      a: "No. Compramos la propiedad tal cual está. Puedes dejar muebles, escombros, o lo que no quieras llevarte.",
    },
    {
      q: "¿Cómo determinan la oferta?",
      a: "Analizamos la ubicación, el estado de la estructura, costos estimados de rehabilitación, y propiedades comparables vendidas recientemente. La oferta es justa basada en datos reales.",
    },
    {
      q: "¿Puedo recibir el pago en efectivo?",
      a: "El pago se hace mediante cheque de gerente o transferencia bancaria al momento del cierre, según prefieras.",
    },
  ];

  return (
    <section id="preguntas" className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <div className="text-xs uppercase tracking-wider text-gold-600 mb-3">Preguntas frecuentes</div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold">
          Respuestas <span className="text-gold-shimmer italic">claras</span>
        </h2>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <FAQItem key={i} q={it.q} a={it.a} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-ink/2"
      >
        <span className="font-display text-lg font-medium">{q}</span>
        <ChevronDown size={20} className={`flex-shrink-0 text-gold-600 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 -mt-1 text-ink/70 leading-relaxed text-sm animate-fade-in">{a}</div>
      )}
    </div>
  );
}

function CTA() {
  return (
    <section className="bg-ink text-white py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight mb-6">
          Listo para <span className="text-gold-shimmer italic">vender</span>?
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Empieza con una conversación de 5 minutos. Sin obligación. Sin papeleo todavía. Solo cuéntanos de tu propiedad.
        </p>
        <Link href="/chat" className="btn btn-gold text-base px-10 py-5 animate-pulse-gold">
          <MessageCircle size={20} /> Iniciar conversación
        </Link>
        <div className="mt-8 flex justify-center gap-6 text-sm text-white/60">
          <a href="tel:+17879460003" className="hover:text-gold-300 flex items-center gap-2">
            <Phone size={14} /> 787-946-0003
          </a>
          <a href="mailto:realtykingspr@gmail.com" className="hover:text-gold-300 flex items-center gap-2">
            <Mail size={14} /> realtykingspr@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink/95 text-white/70 py-10 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Image src="/rk-logo.jpg" alt="Realty Kings" width={80} height={32} className="object-contain opacity-80" />
          <div>© {new Date().getFullYear()} Realty Kings PR. Todos los derechos reservados.</div>
        </div>
        <div className="flex gap-5">
          <a href="tel:+17879460003" className="hover:text-gold-300">787-946-0003</a>
          <a href="mailto:realtykingspr@gmail.com" className="hover:text-gold-300">realtykingspr@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
