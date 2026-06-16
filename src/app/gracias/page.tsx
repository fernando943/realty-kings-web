"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, Mail, Clock, ArrowRight, Crown } from "lucide-react";

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-hero-radial text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center">
          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-gradient mb-8 animate-pulse-gold">
            <CheckCircle2 size={40} className="text-ink" />
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight mb-4">
            ¡Recibido! <br />
            <span className="text-gold-shimmer italic">Tu información está con nosotros.</span>
          </h1>

          <p className="text-lg text-white/70 max-w-lg mx-auto mb-12">
            Un miembro de nuestro equipo revisará los detalles y te llamará dentro de las próximas 24 horas con una oferta inicial.
          </p>

          {/* Next steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <Step n="01" icon={Clock} title="Análisis" text="Revisamos tu información en las próximas horas." />
            <Step n="02" icon={Phone} title="Llamada" text="Te llamamos en 24h con la oferta inicial." />
            <Step n="03" icon={ArrowRight} title="Cierre" text="Si aceptas, coordinamos cierre en 14 días." />
          </div>

          {/* Contact card */}
          <div className="card !bg-white/5 !text-white backdrop-blur-sm p-6 border border-white/10 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs text-gold-300 uppercase tracking-wider mb-3">
              <Crown size={12} /> Contacto inmediato
            </div>
            <p className="text-sm text-white/70 mb-4">
              Si necesitas hablar antes:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+17879460003" className="btn btn-gold flex-1">
                <Phone size={16} /> 787-946-0003
              </a>
              <a href="mailto:realtykingspr@gmail.com" className="btn btn-ghost !text-white !border-white/30 flex-1">
                <Mail size={16} /> Email
              </a>
            </div>
          </div>

          <Link href="/" className="inline-block mt-10 text-white/60 hover:text-gold-300 text-sm">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

function Step({ n, icon: Icon, title, text }: { n: string; icon: any; title: string; text: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-left">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gold-300 font-display font-semibold">{n}</span>
        <Icon size={14} className="text-gold-300" />
      </div>
      <div className="font-display text-lg font-semibold mb-1">{title}</div>
      <div className="text-xs text-white/60">{text}</div>
    </div>
  );
}
