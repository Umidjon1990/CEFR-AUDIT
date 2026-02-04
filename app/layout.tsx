import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Premium typography
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CEFR Audit | Diagnostika",
  description: "Chet tilini o‘rganishdagi asosiy to‘siqlaringizni aniqlang va aniq yechim oling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={cn(outfit.className, "bg-slate-50 text-slate-900 antialiased min-h-screen")}>
        {children}
      </body>
    </html>
  );
}
