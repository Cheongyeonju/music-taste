import type { Metadata } from 'next';
import MusicTaste from '@/components/MusicTaste'; // 컴포넌트 경로는 프로젝트 구조에 맞게 확인해주세요
import { RECIPES_KO } from '@/constants/dishData';

type Props = {
  params: { code: string };
};

// ★ 여기가 핵심입니다: 16개 모든 결과 페이지의 메타데이터를 여기서 생성합니다.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const code = params.code;
  // 결과 데이터 가져오기 (없으면 기본값)
  const result = RECIPES_KO[code] || RECIPES_KO['default'];

  return {
    // 1. 제목과 설명은 결과에 따라 다르게 (동적)
    title: `Music Tasty | ${result.name}`,
    description: result.description,

    // 2. 썸네일 이미지는 'main-thumb.png'로 고정 (정적)
    openGraph: {
      title: `당신의 음악 취향: ${result.name} 🍽️`,
      description: result.description,
      url: `https://music-taste-unlisted.vercel.app/share/${code}`,
      siteName: 'Music Tasty',
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: '/main-thumb.png', // ★ 16개 결과 모두 이 이미지를 사용하게 됩니다!
          width: 1200,
          height: 630,
          alt: 'Music Tasty Main Thumbnail',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `당신의 음악 취향: ${result.name}`,
      description: result.description,
      images: ['/main-thumb.png'], // ★ 트위터도 동일하게 고정
    },
  };
}

export default function SharePage() {
  return <MusicTaste />;
}