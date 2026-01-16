import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Tasty | 당신의 음악은 무슨 맛인가요?", 
  description: "내 음악 취향을 분석하고, 나만의 플레이리스트 맛을 찾아보세요.",
  
  openGraph: {
    title: "Music Tasty : 내 음악 취향 분석",
    description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
    url: "music-taste-2026-01.vercel.app", 
    siteName: "Music Tasty",
    images: [
      {
        url: "/api/og", // [수정] 파일 경로 대신 API 경로로 변경
        width: 1200,
        height: 630,
        alt: "Music Tasty Main",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}