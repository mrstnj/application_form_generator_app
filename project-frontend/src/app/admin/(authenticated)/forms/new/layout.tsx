import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "フォーム登録"
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
