import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"] 
});

export const metadata: Metadata = {
  title: "Tio Patinhas | Dashboard Financeiro",
  description: "Controle financeiro seguro, institucional e premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} antialiased selection:bg-[#FFD700] selection:text-[#1A237E]`}>
        {children}
      </body>
    </html>
  );
}
