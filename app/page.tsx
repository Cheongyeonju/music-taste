import MusicOmakase from '@/components/MusicTaste';
import { Metadata } from "next";
// import { RECIPES } from "@/constants/dishData"; // 메인 썸네일만 쓸 거면 필요 없음

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // ★ [핵심] 복잡한 로직 다 지우고, 무조건 고정 이미지로 설정!
  const fixedImageUrl = 'https://music-taste-unlisted.vercel.app/main-thumb.png';

  return {
    title: "Music Tasty | 당신의 음악은 무슨 맛인가요?",
    description: "내 음악 취향을 분석하고, 나의 입맛에 맞는 플레이리스트를 찾아보세요.",
    openGraph: {
      title: "Music Tasty : 내 음악 취향 분석",
      description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
      url: "https://music-taste-unlisted.vercel.app",
      images: [
        {
          url: fixedImageUrl, // 여기서 고정 이미지를 강제로 박아버립니다.
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Music Tasty : 내 음악 취향 분석",
      description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
      images: [fixedImageUrl],
    },
  };
}

export default function Home() {
  return (
    <main>
      <MusicOmakase />
    </main>
  );
}