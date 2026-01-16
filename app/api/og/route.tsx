import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { RECIPES } from '@/constants/dishData'; // 데이터 가져오기

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code'); // URL에서 결과 코드(SCOF 등) 가져오기

    // 코드가 없거나 데이터에 없으면 기본값 사용
    const recipe = (code && RECIPES[code]) ? RECIPES[code] : RECIPES['default'];

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            fontFamily: 'sans-serif',
            border: '20px solid #121212', // 테두리 장식
          }}
        >
          {/* [수정] 상단 텍스트 변경: 오마카세 느낌 제거 -> 브랜드명 강조 */}
          <div style={{ fontSize: 30, color: '#666', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '4px' }}>
            MUSIC TASTY
          </div>

          {/* 메인 이모지 */}
          <div style={{ fontSize: 130, marginBottom: 20 }}>
            {recipe.emoji}
          </div>

          {/* 결과 이름 */}
          <div style={{ 
            fontSize: 60, 
            fontWeight: 'bold', 
            color: '#000', 
            textAlign: 'center',
            padding: '0 40px',
            lineHeight: 1.2
          }}>
            {recipe.name}
          </div>

          {/* 태그들 */}
          <div style={{ display: 'flex', gap: '15px', marginTop: 30 }}>
            {recipe.tags.slice(0, 3).map((tag: string) => (
              <div key={tag} style={{
                fontSize: 24,
                backgroundColor: '#f3e8ff', // 연한 보라색
                color: '#6b21a8',
                padding: '10px 20px',
                borderRadius: '30px',
              }}>
                #{tag}
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}