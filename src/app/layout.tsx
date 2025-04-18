// src/app/layout.tsx
import { getServerSession } from "next-auth";
import SessionWrapper from "@/components/SessionWrapper";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onix corporation",
  description: "Criado pela equipa Onix corporation",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionWrapper session={session}>{children}</SessionWrapper>
      </body>
    </html>
  );
}
