import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "web·kit — Skills Claude construits sur ton expertise",
  description:
    "Je construis un kit de 15 à 25 skills Claude à partir de tes process réels. Claude travaille comme toi, pas comme tout le monde.",
  openGraph: {
    title: "web·kit — Skills Claude construits sur ton expertise",
    description:
      "Je construis un kit de 15 à 25 skills Claude à partir de tes process réels. Claude travaille comme toi, pas comme tout le monde.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
