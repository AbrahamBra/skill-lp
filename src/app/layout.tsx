import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Web Kit — Ton site pro en 3 questions",
  description:
    "Installe les skills Claude Code et génère un site professionnel en répondant à 3 questions. Sans coder.",
  openGraph: {
    title: "Web Kit — Ton site pro en 3 questions",
    description:
      "Installe les skills Claude Code et génère un site professionnel en répondant à 3 questions. Sans coder.",
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
    <html lang="fr" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
