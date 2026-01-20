import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { RECIPES, RECIPES_KO } from '@/constants/dishData';
import MusicTaste from '@/components/Music Taste';

// 1. 데이터 가져오기 (DB 대신 상수 파일 사용)
const getAssetData = (code: string) => {
  if (!code || code === 'undefined') return null;

  const dataKO = RECIPES_KO[code];
  const dataEN = RECIPES[code];

  if (!dataKO) return null;

  return {
    title: dataKO.name,
    description: dataKO.description,
    emoji: dataEN.emoji || '🍽️',
  };
};

type Props = {
  params: Promise<{ code: string }>
}

// 2. 동적 메타데이터 생성 (카톡 공유용)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { code } = await params;
  const data = getAssetData(code);

  // 배포된 도메인 주소 (없으면 로컬호스트)
  // Vercel 배포 후에는 실제 도메인(https://...)으로 자동 인식되거나 교체해야 합니다.
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'music-taste-unlisted.vercel.app';

  if (!data) {
    return {
      title: 'Music Tasty',
      description: '당신의 음악 취향을 분석해보세요.',
    };
  }

  // ★ API 라우트를 통해 이미지를 동적으로 생성하는 URL
  const ogImageUrl = `${baseUrl}/api/og?code=${code}`;

  return {
    title: `[분석 결과] ${data.emoji} ${data.title}`,
    description: data.description,
    openGraph: {
      title: `${data.emoji} 당신의 음악 취향은 '${data.title}'`,
      description: data.description,
      url: `${baseUrl}/share/${code}`,
      images: [
        {
          url: ogImageUrl, // /api/og?code=... 로 연결됨
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: 'website',
    },
  };
}

// 3. 페이지 컴포넌트
export default async function SharedAssetPage({ params }: Props) {
  const { code } = await params;
  
  // 데이터 유효성 체크
  const isValid = getAssetData(code);

  if (!isValid) {
    return notFound();
  }

  // ★ 공유받고 들어온 사람에게는 '결과'가 아닌 '테스트 시작 화면'을 보여줍니다.
  return (
    <main className="w-full min-h-screen bg-[#121212]">
      <MusicTaste />
    </main>
  );
}