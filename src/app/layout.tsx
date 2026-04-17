import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "GoodMood — Ton programme wellness personnalisé",
    template: "%s | GoodMood",
  },
  description:
    "GoodMood : plateforme wellness complète avec programmes sport, nutrition personnalisée, suivi de progrès et conseils bien-être.",
  keywords: ["wellness", "sport", "nutrition", "bien-être", "programme personnalisé"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={dmSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
