import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { RECIPES } from '@/constants/dishData';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    // 1. 코드가 있으면: 결과 페이지 디자인 (기존 유지)
    if (code && RECIPES[code]) {
      const recipe = RECIPES[code];
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
              backgroundColor: '#fff', // 결과는 흰색 배경
              fontFamily: '"Pretendard", sans-serif',
              border: '20px solid #121212',
            }}
          >
            <div style={{ fontSize: 30, color: '#666', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '4px' }}>
              MUSIC TASTY
            </div>
            <div style={{ fontSize: 130, marginBottom: 20 }}>
              {recipe.emoji}
            </div>
            <div style={{ fontSize: 60, fontWeight: 'bold', color: '#000', textAlign: 'center', padding: '0 40px', lineHeight: 1.2 }}>
              {recipe.name}
            </div>
            <div style={{ display: 'flex', gap: '15px', marginTop: 30 }}>
              {recipe.tags.slice(0, 3).map((tag: string) => (
                <div key={tag} style={{ fontSize: 24, backgroundColor: '#f3e8ff', color: '#6b21a8', padding: '10px 20px', borderRadius: '30px' }}>
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        ),
        { width: 1200, height: 630 }
      );
    }

    // 2. 코드가 없으면 (메인 화면): 시작 화면 디자인 (검정 배경 + 네온)
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
            backgroundColor: '#121212', // 검정 배경
            fontFamily: '"Pretendard", sans-serif',
          }}
        >
          {/* 장식용 아이콘 */}
          <div style={{ fontSize: 100, marginBottom: 40, filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.6))' }}>
            🎵
          </div>

          {/* 메인 타이틀 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 40, color: '#fff', marginBottom: 10, letterSpacing: '-1px' }}>
              What&apos;s Your
            </div>
            <div style={{ 
              fontSize: 90, 
              fontWeight: 900, 
              color: 'transparent', 
              backgroundImage: 'linear-gradient(to right, #c084fc, #db2777)', // 네온 그라데이션
              backgroundClip: 'text',
              lineHeight: 1.1,
              letterSpacing: '-3px'
            }}>
              Music Tasty?
            </div>
          </div>

          {/* 하단 설명 */}
          <div style={{ fontSize: 30, color: '#a1a1aa', marginTop: 40, fontWeight: 'normal' }}>
            당신의 음악은 무슨 맛인가요?
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );

  } catch (e: any) {
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}