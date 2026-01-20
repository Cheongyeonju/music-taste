import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// 폰트 주소 (구글 공식 gstatic - 가장 빠르고 안정적)
const fontEndpoint = 'https://fonts.gstatic.com/s/nanumgothic/v23/PN_3Rfi-oW3hYwmKDpxS7F_z-7r5.ttf';

export async function GET(request: NextRequest) {
  try {
    // 1. 폰트 로드 (캐시 적용)
    const fontData = await fetch(new URL(fontEndpoint, import.meta.url), {
      cache: 'force-cache',
    }).then((res) => res.arrayBuffer());

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
            backgroundColor: '#000000',
            fontFamily: '"NanumGothic"',
          }}
        >
          {/* 로고 아이콘 (위치 보정 유지) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#1a1a1a',
              marginBottom: '30px',
              fontSize: '50px',
              textAlign: 'center',
              transform: 'translateY(-5px)', 
            }}
          >
            🍽️
          </div>

          {/* 상단 텍스트 */}
          <div style={{ fontSize: 60, fontWeight: 700, color: 'white', marginBottom: 10, display: 'flex' }}>
            WHAT'S YOUR
          </div>

          {/* ★ 하단 텍스트: MUSIC TASTY? ★ */}
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontWeight: 700,
              // [핵심 수정] 부모 컨테이너 자체에 오른쪽 여백을 넉넉히 줍니다.
              paddingRight: '30px', 
              // 혹시 모를 잘림 방지를 위해 overflow 속성 명시
              overflow: 'visible', 
            }}
          >
            <span style={{ color: '#a855f7' }}>MUSIC</span>
            <span style={{ width: 15 }} />
            {/* span 태그에 있던 paddingRight는 제거했습니다. */}
            <span style={{ color: '#60a5fa' }}> 
              TASTY?
            </span>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 420,
        fonts: [
          {
            name: 'NanumGothic',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed', { status: 500 });
  }
}