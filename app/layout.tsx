import type { Metadata } from "next";
// ★ 1. Inter 대신 Noto_Sans_KR 불러오기
import { Noto_Sans_KR } from "next/font/google"; 
import "./globals.css";

// ★ 2. 폰트 설정 (다양한 굵기 사용을 위해 weight 설정 추가 가능)
const notoSansKr = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ['100', '300', '400', '500', '700', '900'], // 얇은 폰트부터 굵은 폰트까지 모두 로드
});

export const metadata: Metadata = {
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
    images: [
      {
        url: "/main-thumb.png",
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
      {/* ★ 3. body 클래스에 notoSansKr 적용 */}
      <body className={notoSansKr.className}>
        {children}
      </body>
    </html>
  );
}
