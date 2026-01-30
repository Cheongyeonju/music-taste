import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google"; 
import "./globals.css";

const notoSansKr = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://music-taste-unlisted.vercel.app'),

  title: "Music Taste | 당신의 음악은 무슨 맛인가요?", // Tasty -> Taste
  description: "내 음악 취향을 분석하고, 나의 입맛에 맞는 플레이리스트를 찾아보세요.",

  openGraph: {
    title: "Music Taste : 내 음악 취향 분석", // Tasty -> Taste
    description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
    url: "https://music-taste-unlisted.vercel.app",
    siteName: "Music Taste", // Tasty -> Taste
    locale: 'ko_KR',
    type: "website",
    images: [
      {
        url: "/main-thumb.png",
        width: 1200,
        height: 630,
        alt: "Music Taste Main Thumbnail",
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: "Music Taste : 내 음악 취향 분석", // Tasty -> Taste
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
      <body className={notoSansKr.className}>
        {children}
      </body>
    </html>
  );
}