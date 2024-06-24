import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プラン申込"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
