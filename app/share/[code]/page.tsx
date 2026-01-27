import type { Metadata } from 'next';
import MusicTaste from '@/components/MusicTaste'; 
import { RECIPES_KO } from '@/constants/dishData';

// ★ 수정 1: params 타입을 Promise로 변경 (Next.js 15 대응)
type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ★ 수정 2: params를 await로 기다린 후 code 추출
  const resolvedParams = await params;
  const code = resolvedParams.code.toUpperCase(); // 대문자 변환으로 안전하게 매칭

  // 결과 데이터 찾기
  const result = RECIPES_KO[code] || RECIPES_KO['default'];
  const fixedDescription = "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.";

  return {
    title: `Music Tasty | ${result.name}`,
    description: fixedDescription,

    openGraph: {
      title: `당신의 음악 취향은 '${result.name}'`, // 결과별 제목 적용
      description: fixedDescription,
      url: `https://music-taste-unlisted.vercel.app/share/${code}`,
      siteName: 'Music Tasty',
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: '/main-thumb.png',
          width: 1200,
          height: 630,
          alt: 'Music Tasty Main Thumbnail',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `당신의 음악 취향은 '${result.name}'`,
      description: fixedDescription,
      images: ['/main-thumb.png'],
    },
  };
}

export default function SharePage() {
  return <MusicTaste />;
}