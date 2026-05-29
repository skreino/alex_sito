import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alex-rox-tattoo.vercel.app"),
  title: "ALEX ROX | Chicano Black & Grey Tattoo Artist Busnago",
  description:
    "Premium Chicano, blackwork, lettering, realism and black and grey tattoo artist in Busnago MB. Custom tattoo bookings via WhatsApp.",
  keywords: [
    "ALEX ROX",
    "tattoo Busnago",
    "Chicano tattoo",
    "black and grey tattoo",
    "lettering tattoo",
    "blackwork tattoo",
    "realism tattoo"
  ],
  openGraph: {
    title: "ALEX ROX | Chicano Soul. Black Ink. Real Stories.",
    description:
      "Custom tattoos built around identity, style and meaning. Black and grey, lettering and chicano-inspired work.",
    type: "website",
    locale: "en_US",
    images: ["/images/tattoos/tattoo (1).jpeg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
