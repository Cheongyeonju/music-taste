import type { Metadata } from 'next';
import MusicTaste from '@/components/MusicTaste'; 
import { RECIPES_KO } from '@/constants/dishData';

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const code = resolvedParams.code.toUpperCase();
  const result = RECIPES_KO[code] || RECIPES_KO['default'];
  
  // ★ 수정됨: 경로를 간단하게 변경 (v2로 변경)
  const fixedImageUrl = '/main-thumb-v2.png'; 

  return {
    title: `Music Taste | ${result.name}`, 
    description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",

    openGraph: {
      title: `당신의 음악 취향은 '${result.name}'`,
      description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
      url: `https://music-taste-unlisted.vercel.app/share/${code}`,
      siteName: 'Music Taste',
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: fixedImageUrl, // ★ 수정된 변수 사용
          width: 1200,
          height: 630,
          alt: "Music Taste Main Thumbnail",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `당신의 음악 취향은 '${result.name}'`,
      description: "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.",
      images: [fixedImageUrl], // ★ 수정된 변수 사용
    },
  };
}

export default function SharePage() {
  return <MusicTaste />;
}