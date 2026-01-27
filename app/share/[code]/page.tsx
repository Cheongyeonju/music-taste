import type { Metadata } from 'next';
import MusicTaste from '@/components/MusicTaste'; 
import { RECIPES_KO } from '@/constants/dishData';

type Props = {
  params: { code: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const code = params.code;
  const result = RECIPES_KO[code] || RECIPES_KO['default'];

  // ★ 요청하신 고정 멘트
  const fixedDescription = "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.";

  return {
    // 1. 제목: 결과 이름은 유지 (예: 당신의 음악 취향은 '진한 다크 초콜릿')
    title: `Music Tasty | ${result.name}`,
    
    // 2. 설명: 무조건 고정 멘트로 변경
    description: fixedDescription,

    openGraph: {
      title: `당신의 음악 취향은 '${result.name}'`, // 카톡 제목 (결과 이름)
      description: fixedDescription, // ★ 카톡 설명 (회색 글씨) -> 고정 멘트
      url: `https://music-taste-unlisted.vercel.app/share/${code}`,
      siteName: 'Music Tasty',
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: '/main-thumb.png', // 썸네일은 메인 이미지로 고정
          width: 1200,
          height: 630,
          alt: 'Music Tasty Main Thumbnail',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `당신의 음악 취향은 '${result.name}'`,
      description: fixedDescription, // ★ 트위터 설명도 고정
      images: ['/main-thumb.png'],
    },
  };
}

export default function SharePage() {
  return <MusicTaste />;
}