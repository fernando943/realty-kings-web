import type { Metadata } from "next";
import { HerenciasContent } from "./HerenciasContent";

export const metadata: Metadata = {
  title: "Compramos Casas Heredadas en Puerto Rico | Herencias",
  description:
    "¿Heredaste una casa en Puerto Rico? La compramos cash — sucesiones, múltiples herederos, sin declaratoria, con deudas de CRIM. Sin comisiones. Oferta en 24 horas. Llama 787-667-4033.",
  keywords: [
    "vender casa heredada Puerto Rico", "casa herencia PR", "vender propiedad en sucesión",
    "compramos casas herencia", "herederos vender casa", "casa con deuda CRIM vender",
  ],
  alternates: { canonical: "/herencias" },
  openGraph: {
    type: "website",
    locale: "es_PR",
    url: "https://realtykingspr.com/herencias",
    siteName: "Realty Kings PR",
    title: "Compramos Casas Heredadas en Puerto Rico",
    description: "Sucesiones, múltiples herederos, deudas de CRIM — la compramos cash. Oferta en 24h. 787-667-4033.",
    images: [{ url: "/photos/pr-home-row.jpg", width: 1200, height: 630, alt: "Realty Kings — Compramos casas heredadas" }],
  },
};

export default function HerenciasPage() {
  return <HerenciasContent />;
}
