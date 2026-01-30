import MusicOmakase from '@/components/MusicTaste';
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // ★ [수정됨] public 폴더에 있는 새 이미지 이름으로 변경!
  // (슬래시 '/' 하나만 붙이면 자동으로 public 폴더를 가리킵니다)
  const fixedImageUrl = '/main-thumb-v2.png';

  return {
    title: "Music Taste | 당신의 음악은 무슨 맛인가요?",
    description: "내 음악 취향을 분석하고, 나의 입맛에 맞는 플레이리스트를 찾아보세요.",
    openGraph: {
      title: "Music Taste : 내 음악 취향 분석",
      description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
      url: "https://music-taste-unlisted.vercel.app",
      images: [
        {
          url: fixedImageUrl, // ★ 수정된 변수 적용
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Music Taste : 내 음악 취향 분석",
      description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
      images: [fixedImageUrl], // ★ 수정된 변수 적용
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