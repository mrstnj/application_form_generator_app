import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "企業一覧"
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
