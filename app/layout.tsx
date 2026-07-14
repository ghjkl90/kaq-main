import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"; // 헤더 불러오기
import Footer from "./components/Footer"; // 푸터 불러오기

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 타이틀과 한 줄 소개를 KAQ 연구소에 맞게 수정해두었습니다.
export const metadata: Metadata = {
  title: "KAQ",
  description: "Digital Innovation in Quality Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header onOpenContact={() => {}} />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}