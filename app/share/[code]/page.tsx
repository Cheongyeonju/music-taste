import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
// 1. 상수 데이터 가져오기 (DB 대신 사용)
import { RECIPES, RECIPES_KO } from '@/constants/dishData';
// 2. 클라이언트 컴포넌트 가져오기 (실제 화면)
import MusicTaste from '@/components/Music Taste';

// 헬퍼 함수: 코드에 맞는 결과 데이터 찾기
const getResultData = (code: string) => {
  if (!code || code === 'undefined') return null;
  
  const dataKO = RECIPES_KO[code]; // 한글 데이터
  const dataEN = RECIPES[code];    // 영문 데이터(이모지용)

  if (!dataKO) return null;

  return {
    title: dataKO.name,       // 예: 화끈한 할라피뇨 버거
    description: dataKO.description, // 예: 한 입 베어 물면...
    emoji: dataEN.emoji || '🍽️',
  };
};

// Next.js 15 대응 Props 타입
type Props = {
  params: Promise<{ code: string }>
}

// ★ 핵심: 서버 사이드 메타데이터 생성 (카톡 공유 미리보기용)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // URL 파라미터에서 코드 추출 (await 필수)
  const { code } = await params;
  
  // 데이터 조회
  const data = getResultData(code);

  // 데이터가 없으면 기본값 리턴
  if (!data) {
    return {
      title: 'Music Tasty - 음악 취향 분석',
      description: '당신의 음악은 무슨 맛인가요?',
    };
  }

  // 데이터가 있으면 "결과 내용"으로 메타데이터 생성
  return {
    title: `[분석 결과] ${data.emoji} ${data.title}`,
    description: data.description,
    openGraph: {
      title: `${data.emoji} 당신의 음악 취향은 '${data.title}'`,
      description: data.description,
      // ★ 중요: 공유 이미지 (없으면 기본 이미지 사용 권장)
      // images: [{ url: 'https://내도메인.com/기본이미지.png' }], 
      type: 'website',
    },
  };
}

// ★ 페이지 컴포넌트 (서버 컴포넌트)
export default async function SharePage({ params }: Props) {
  const { code } = await params;

  // 코드가 유효한지 서버에서 검증
  const isValidCode = RECIPES_KO[code];

  // 없는 코드면 404 페이지로 보냄
  if (!isValidCode) {
    return notFound();
  }

  // ★ 중요: 
  // 여기서는 결과 페이지 UI를 직접 그리지 않고,
  // "테스트 시작 화면(MusicTaste)"을 바로 렌더링합니다.
  // (공유받은 사람은 결과를 보고 들어왔지만, 정작 들어오면 테스트를 처음부터 하게 됨)
  return (
    <main className="w-full min-h-screen bg-[#121212]">
      <MusicTaste />
    </main>
  );
}