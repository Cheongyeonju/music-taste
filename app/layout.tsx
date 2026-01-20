import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 1. 배포된 실제 도메인 주소 (이게 있어야 이미지 경로가 자동으로 완성됩니다)
  metadataBase: new URL('https://music-taste-unlisted.vercel.app'),

  title: "Music Tasty | 당신의 음악은 무슨 맛인가요?",
  description: "내 음악 취향을 분석하고, 나의 입맛에 맞는 플레이리스트를 찾아보세요.",

  openGraph: {
    title: "Music Tasty : 내 음악 취향 분석",
    description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
    url: "https://music-taste-unlisted.vercel.app",
    siteName: "Music Tasty",
    locale: 'ko_KR',
    type: "website",
    // 2. 썸네일 이미지 설정 (public 폴더 기준)
    images: [
      {
        url: "/main-thumb.png", // ★ public 폴더에 있는 파일명과 정확히 일치해야 함!
        width: 1200,
        height: 630,
        alt: "Music Tasty Main Thumbnail",
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: "Music Tasty : 내 음악 취향 분석",
    description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
    images: ["/main-thumb.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
