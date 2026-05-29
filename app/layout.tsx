import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alex-rox-tattoo.vercel.app"),
  title: "ALEX ROX | Tattoo Chicano Black & Grey a Busnago",
  description:
    "Tatuaggi custom chicano, blackwork, lettering, realismo e black and grey a Busnago MB. Prenotazioni dirette su WhatsApp.",
  keywords: [
    "ALEX ROX",
    "tattoo Busnago",
    "tatuaggi chicano",
    "black and grey tattoo",
    "lettering tattoo Busnago",
    "blackwork tattoo",
    "realismo tattoo"
  ],
  alternates: {
    canonical: "/",
    languages: {
      it: "/",
      en: "/"
    }
  },
  openGraph: {
    title: "ALEX ROX | Chicano Soul. Black Ink. Real Stories.",
    description:
      "Tatuaggi custom costruiti intorno a identita, stile e significato. Black and grey, lettering e lavori chicano.",
    type: "website",
    locale: "it_IT",
    images: ["/images/brand/alex-rox-logo.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
