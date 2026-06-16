import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Realty Kings PR — Vendemos tu propiedad rápido",
  description:
    "Compramos casas en Puerto Rico en cualquier condición. Sin comisiones, sin reparaciones. Oferta en 24 horas.",
  openGraph: {
    title: "Realty Kings PR",
    description: "Compramos tu casa en cualquier condición. Oferta en 24 horas.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
