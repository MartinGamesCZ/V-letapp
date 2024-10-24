import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "E-Výlety.cz",
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
