import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
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
    <html lang="en" className={`${playfair.variable} ${poppins.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-bg text-dark font-poppins selection:bg-primary selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
