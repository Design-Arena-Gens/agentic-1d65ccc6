import type { Metadata } from "next";
import { Cinzel, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700']
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: '--font-devanagari',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Rama & Jatayu - Indian Epic Cinematic Scene",
  description: "Hyper-realistic mythic cinematic portrayal of Lord Rama meeting the wounded Jatayu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${devanagari.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
