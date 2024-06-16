import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プラン詳細"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>{children}</div>
  );
}