import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google"; 
import "./globals.css";

const notoSansKr = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://music-taste-unlisted.vercel.app'),

  // ★ Tasty -> Taste 로 수정됨
  title: "Music Taste | 당신의 음악은 무슨 맛인가요?",
  description: "내 음악 취향을 분석하고, 나의 입맛에 맞는 플레이리스트를 찾아보세요.",

  openGraph: {
    // ★ 카톡 공유 시 뜨는 굵은 제목 (Tasty -> Taste)
    title: "Music Taste : 내 음악 취향 분석", 
    description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
    url: "https://music-taste-unlisted.vercel.app",
    siteName: "Music Taste",
    locale: 'ko_KR',
    type: "website",
    images: [
      {
        url: "app/api/og/main-thumb.png", // ★ 이 이미지 파일 자체를 교체하셔야 이미지 속 글자가 바뀝니다!
        width: 1200,
        height: 630,
        alt: "Music Taste Main Thumbnail",
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    // ★ 트위터 공유 제목 (Tasty -> Taste)
    title: "Music Taste : 내 음악 취향 분석",
    description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
    images: ["/app/api/og/main-thumb.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        {children}
      </body>
    </html>
  );
}