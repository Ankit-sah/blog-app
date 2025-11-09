import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Blog App - Modern Blogging Platform",
    template: "%s | Blog App",
  },
  description:
    "A modern blog platform built with Next.js 16, React 18, and TypeScript",
  keywords: ["blog", "nextjs", "react", "typescript"],
  authors: [{ name: "Blog App Team" }],
  creator: "Blog App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background text-foreground antialiased ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
