import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サービス一覧"
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
