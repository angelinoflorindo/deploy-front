import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Onix corporation",
  description: "Criado pela equipa Onix corporation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
