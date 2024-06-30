import type { Metadata } from "next";
import AppBar from '@/features/routes/front/AppBar'
import "./globals.css";

export const metadata: Metadata = {
  title: "トップ"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
