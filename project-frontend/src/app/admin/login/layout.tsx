import type { Metadata } from "next";
import styles from '@/app/LoginPage.module.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "ログイン"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.loginPageBody}>{children}</div>
  );
}
