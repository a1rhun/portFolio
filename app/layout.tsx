import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/common/CustomCursor";
import Footer from "@/components/layout/Footer";
import GlobalNav from "@/components/layout/GlobalNav";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "Frontend Developer Portfolio",
  keywords: ["portfolio", "frontend", "developer", "next.js", "react"],
  authors: [{ name: "Portfolio" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "Portfolio",
    description: "Frontend Developer Portfolio",
    siteName: "Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LenisProvider>
            <CustomCursor />
            <GlobalNav />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
