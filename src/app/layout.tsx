import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

// Axiforma (the real GoodMeal design system font) isn't licensed for web use yet.
// Outfit is a geometric sans with a similar weight range/spirit — swap this back to
// Axiforma via next/font/local once the licensed font files are available.
const axiforma = Outfit({
  variable: "--font-axiforma",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GoodFresh — GoodMeal",
  description: "Frutas y verduras frescas, directo de la vega a tu casa.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${axiforma.variable} h-full antialiased`}>
      <body className="min-h-full bg-neutro-4">
        <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white">
          <CartProvider>{children}</CartProvider>
        </div>
      </body>
    </html>
  );
}
