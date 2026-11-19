import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "JFunnel — your campaign workspace",
  description:
    "JFunnel turns what you sell into a clear offer and a coordinated marketing campaign.",
};

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen antialiased">
        <StoreProvider>
          <header className="border-b border-[var(--jf-line)] bg-white">
            <div className="mx-auto max-w-4xl px-5 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-baseline gap-2">
                <span className="text-lg font-bold tracking-tight">JFunnel</span>
                <span className="text-xs text-[var(--jf-muted)]">campaign workspace</span>
              </Link>
              <span className="text-xs text-[var(--jf-muted)]">
                Demo workspace · Blue Current Diving
              </span>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-5 py-8">{children}</main>
          <footer className="mx-auto max-w-4xl px-5 pb-8 text-xs text-[var(--jf-muted)]">
            JFunnel MVP — approvals and revisions here are handled by a JFunnel operator
            behind the scenes, not an automated backend.
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
