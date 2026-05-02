import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "CAFEXO",
  description: "Experience the masterwork of handcrafted flavor.",
  icons: {
    icon: "/Logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-[#050505] text-white selection:bg-white selection:text-black font-manrope" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
