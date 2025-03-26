import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Onix corporation",
  description: "Criado pela equipa Onix corporation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
