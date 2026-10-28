import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import { ContactProvider } from "./context/ContactContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 기본 URL 설정 (상대 경로 자동 매핑)
  metadataBase: new URL("https://www.kaq.kr"),

  // 검색창 탭 제목 (키워드 조합)
  title: {
    default: "KAQ | (주)케이에이큐 - 품질경영 디지털 혁신 & DSQ 플랫폼",
    template: "%s | KAQ",
  },

  // 검색 결과에 노출될 본문 요약문
  description:
    "디지털 품질 혁신(Digital Innovation in Quality Management)을 선도하는 KAQ 공식 웹사이트입니다. DSQ 플랫폼, K-AI 연구 및 글로벌 솔루션을 제공합니다.",

  // 핵심 검색 키워드
  keywords: [
    "KAQ",
    "케이에이큐",
    "(주)케이에이큐",
    "DSQ",
    "DSQ Platform",
    "K-AI",
    "스마트품질",
    "품질경영",
    "Quality Management",
  ],

  // 카카오톡, 링크드인, 페이스북 등 링크 공유 시 뜨는 카드(미리보기) 설정
  openGraph: {
    title: "KAQ | (주)케이에이큐",
    description: "디지털 품질 혁신(Digital Innovation in Quality Management)을 선도하는 KAQ 공식 웹사이트입니다.",
    url: "https://www.kaq.kr",
    siteName: "KAQ",
    locale: "ko_KR",
    type: "website",
  },

  verification: {
    other: {
      "naver-site-verification": "naver47c94ed1b944fb4f2f80c19940a147f6",
    },
  },

  // 검색 로봇 수집 허용 명시
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <ContactProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </ContactProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}