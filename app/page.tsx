import MusicOmakase from '@/components/MusicTaste'; // 컴포넌트 파일명/이름 확인 필요
import { Metadata, ResolvingMetadata } from "next";
import { RECIPES } from "@/constants/dishData";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // 1. searchParams를 먼저 await로 풉니다.
  const resolvedParams = await searchParams;
  
  // 2. 값을 꺼냅니다. (아직은 string | string[] 상태)
  const rawCode = resolvedParams.code;

  // 3. 배열이면 첫 번째 것만, 아니면 그대로 사용해서 '문자열'로 고정합니다.
  const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

  // 4. 레시피 데이터 찾기
  const recipe = (code && RECIPES[code]) ? RECIPES[code] : null;

  // [주의] 본인 배포 주소 확인
  const ogUrl = new URL('https://music-taste-unlisted.vercel.app/api/og'); 
  
  // ★ [수정 1] if문을 여기서 명확하게 닫아줍니다.
  if (code) {
      ogUrl.searchParams.set('code', code);
  }

  // 5. 결과가 있으면 그 결과에 맞는 제목/설명 설정
  const title = recipe 
    ? `내 음악 취향은 '${recipe.name}' ${recipe.emoji || '🍽️'}`
    : "Music Tasty : 내 음악 취향 분석";
    
  const description = recipe
    ? `당신도 테스트해보세요!`
    : "당신의 음악 취향을 분석해 최적의 플레이리스트를 추천해 드립니다.";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [ogUrl.toString()], // 동적 이미지 연결
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogUrl.toString()],
    }
  };
}

export default function Home() {
  return (
    <main>
      <MusicOmakase />
    </main>
  );
}