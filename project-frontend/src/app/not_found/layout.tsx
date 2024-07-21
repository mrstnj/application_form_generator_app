import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 NOT FOUND"
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
