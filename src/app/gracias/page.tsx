"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, Mail, Clock, ArrowRight } from "lucide-react";

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-blue-deep text-white flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="max-w-2xl w-full relative">
        <div className="text-center">
          {/* Logo monogram */}
          <Image src="/rk-monogram.png" alt="Realty Kings" width={120} height={80} className="mx-auto mb-6 h-16 w-auto object-contain" />

          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brandgreen mb-8 animate-pulse-green">
            <CheckCircle2 size={40} className="text-white" />
          </div>

          <h1 className="font-poster text-5xl md:text-6xl leading-none mb-4">
            ¡Recibido! <br />
            <span className="text-cash">Tu oferta está en camino.</span>
          </h1>

          <p className="text-lg text-white/75 max-w-lg mx-auto mb-12">
            Un miembro de nuestro equipo revisará los detalles y te llamará dentro de las próximas 24 horas con tu oferta cash.
          </p>

          {/* Next steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <Step n="1" icon={Clock} title="Análisis" text="Revisamos tu información en las próximas horas." />
            <Step n="2" icon={Phone} title="Llamada" text="Te llamamos en 24h con tu oferta cash." />
            <Step n="3" icon={ArrowRight} title="Cierre" text="Si aceptas, cerramos en 7 a 14 días." />
          </div>

          {/* Contact card */}
          <div className="card !bg-white/8 !text-white backdrop-blur-sm p-6 border border-white/12 max-w-md mx-auto">
            <div className="text-xs text-cash uppercase tracking-wider mb-3 font-bold">
              Contacto inmediato
            </div>
            <p className="text-sm text-white/70 mb-4">
              Si necesitas hablar antes:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+17876679389" className="btn btn-green flex-1">
                <Phone size={16} /> 787-667-9389
              </a>
              <a href="mailto:realtykingspr@gmail.com" className="btn btn-ghost-light flex-1">
                <Mail size={16} /> Email
              </a>
            </div>
          </div>

          <Link href="/" className="inline-block mt-10 text-white/60 hover:text-cash text-sm">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

function Step({ n, icon: Icon, title, text }: { n: string; icon: any; title: string; text: string }) {
  return (
    <div className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-xl p-5 text-left">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-6 h-6 rounded-full bg-cash text-brandblue-ink font-poster text-sm flex items-center justify-center">{n}</span>
        <Icon size={14} className="text-cash" />
      </div>
      <div className="font-poster text-lg mb-1">{title}</div>
      <div className="text-xs text-white/65">{text}</div>
    </div>
  );
}
