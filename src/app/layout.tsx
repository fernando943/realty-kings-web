import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";

// NOTE: update SITE_URL to the custom domain once purchased (GTM-01/02).
const SITE_URL = "https://realty-kings-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Compramos Casas Cash en Puerto Rico | Realty Kings",
    template: "%s | Realty Kings PR",
  },
  description:
    "Vende tu casa rápido en Puerto Rico. Compramos en cualquier condición — herencias, atrasos, ejecuciones, divorcios. Sin comisiones, sin reparaciones. Oferta cash en 24 horas. Llama 787-667-9389.",
  keywords: [
    "compramos casas", "vender casa rápido Puerto Rico", "casa herencia Puerto Rico",
    "comprar casa cash PR", "vender casa sin comisiones", "ejecución hipotecaria",
    "cash home buyer Puerto Rico", "vender propiedad rápido PR",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PR",
    url: SITE_URL,
    siteName: "Realty Kings PR",
    title: "Compramos Casas Cash en Todo Puerto Rico",
    description:
      "Oferta cash en 24 horas, cierre en 7 días. Sin comisiones, sin reparaciones. Llama 787-667-9389.",
    images: [{ url: "/photos/pr-home-greenwhite.jpg", width: 1200, height: 630, alt: "Realty Kings — Compramos Casas Cash en Puerto Rico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compramos Casas Cash en Puerto Rico",
    description: "Oferta cash en 24 horas. Sin comisiones. 787-667-9389.",
    images: ["/photos/pr-home-greenwhite.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b5fd4",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Realty Kings Properties",
  image: `${SITE_URL}/rk-logo.png`,
  url: SITE_URL,
  telephone: "+1-787-667-9389",
  description: "Compramos casas cash en Puerto Rico en cualquier condición — herencias, atrasos, ejecuciones, divorcios. Sin comisiones, sin reparaciones. Oferta en 24 horas.",
  areaServed: { "@type": "State", name: "Puerto Rico" },
  address: { "@type": "PostalAddress", addressRegion: "PR", addressCountry: "US" },
  priceRange: "$$",
  knowsLanguage: ["es", "en"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Analytics />
      </body>
    </html>
  );
}
