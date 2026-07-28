import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amazone",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`  h-full antialiased`}>
      <body className={` ${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
