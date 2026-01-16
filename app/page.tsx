import MusicOmakase from '@/components/Music Taste';
import { Metadata, ResolvingMetadata } from "next";
import { RECIPES } from "@/constants/dishData";


type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}
// [핵심] URL의 ?code=... 를 읽어서 동적으로 썸네일을 바꿈
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // 1. URL에서 code 읽기
  const code = searchParams.code as string;
  
  // 2. 결과 데이터 찾기 (없으면 기본값)
  const recipe = (code && RECIPES[code]) ? RECIPES[code] : null;

  // 3. 썸네일 주소 만들기
  // 예: https://site.com/api/og?code=SCOF
  const ogUrl = new URL('https://music-taste-liard.vercel.app/'); // [주의] 본인 배포 주소로 변경!!
  if (code) ogUrl.searchParams.set('code', code);

  // 4. 결과가 있으면 그 결과에 맞는 제목/설명 설정
  const title = recipe 
    ? `내 음악 취향은 '${recipe.name}' ${recipe.emoji}`
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
  }
}

export default function Home() {
  return (
    <main>
      <MusicOmakase />
    </main>
  );
}