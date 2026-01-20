import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { RECIPES, RECIPES_KO } from '@/constants/dishData'; 
import MusicTaste from '@/components/Music Taste'; // 메인 게임 컴포넌트

// 1. 결과 데이터 조회 (메타데이터 생성용)
const getResultData = (code: string) => {
  if (!code || code === 'undefined') return null;
  const dataKO = RECIPES_KO[code];
  const dataEN = RECIPES[code];
  
  // 데이터가 없으면 null 반환
  if (!dataKO) return null;

  return {
    title: dataKO.name,
    description: dataKO.description,
    emoji: dataEN.emoji || '🍽️',
  };
};

// 2. 동적 메타데이터 생성 (카톡/SNS 공유 미리보기용)
// ★ 봇에게는 "결과 내용(제목, 설명, 이미지)"을 보여줍니다.
type Props = {
  params: Promise<{ code: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { code } = await params;
  const data = getResultData(code);

  // 유효하지 않은 코드일 경우 기본 메타데이터
  if (!data) {
    return {
      title: 'Music Tasty',
      description: '당신의 음악 취향을 분석해보세요.',
    };
  }

  return {
    title: `Music Tasty 결과 | ${data.title}`, 
    description: data.description,
    openGraph: {
      title: `당신의 음악 취향은 '${data.title}' ${data.emoji}`,
      description: data.description,
      // 미리보기 이미지는 결과에 맞는 영수증 이미지 생성
      images: [{ 
        url: `/api/og?code=${code}`, 
        width: 1200, 
        height: 630, 
        alt: data.title 
      }],
      type: 'website',
    },
  };
}

// 3. 실제 페이지 컴포넌트 (사람이 보는 화면)
// ★ 사용자가 들어오면 결과지가 아닌 "테스트 시작 화면"을 보여줍니다.
export default async function ShareLandingPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  
  // 코드가 유효한지 체크 (DB에 없는 코드면 404)
  if (!code || !RECIPES_KO[code]) return notFound();

  // [핵심] 결과 페이지 UI를 만들지 않고, 바로 메인 컴포넌트를 실행합니다.
  return (
    <main>
      <MusicTaste />
    </main>
  );
}