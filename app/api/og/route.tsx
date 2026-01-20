import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // 1. 폰트 로드 시도 (실패 시 에러를 잡기 위해 try-catch로 감싸지 않고 여기서 처리)
    const fontData = await fetch(
      'https://cdn.jsdelivr.net/gh/google/fonts/ofl/nanumgothic/NanumGothic-Bold.ttf'
    ).then((res) => {
      if (!res.ok) throw new Error('Font fetch failed');
      return res.arrayBuffer();
    }).catch((e) => {
      // 폰트 로드 실패 시 콘솔에 로그만 남기고 null 반환
      console.error('Font Loading Error:', e);
      return null;
    });

    // 2. 이미지 생성
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
            // 폰트가 있으면 적용, 없으면 시스템 기본 폰트(sans-serif) 사용
            fontFamily: fontData ? '"NanumGothic"' : 'sans-serif',
          }}
        >
          {/* 로고 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#1a1a1a',
              marginBottom: '40px',
              fontSize: '60px',
              // 그림자는 무거울 수 있어 단순화
              border: '1px solid #333', 
            }}
          >
            🍽️
          </div>

          <div
            style={{
              fontSize: 70,
              fontWeight: 700,
              color: 'white',
              marginBottom: 10,
              display: 'flex',
            }}
          >
            WHAT'S YOUR
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 70,
              fontWeight: 700,
            }}
          >
            <span style={{ color: '#a855f7' }}>MUSIC</span>
            <span style={{ width: 20 }} />
            <span style={{ color: '#60a5fa' }}>TASTY?</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // 폰트 데이터가 있을 때만 옵션에 추가
        fonts: fontData
          ? [
              {
                name: 'NanumGothic',
                data: fontData,
                style: 'normal',
                weight: 700,
              },
            ]
          : undefined,
      }
    );
  } catch (e: any) {
    // 3. 진짜 에러가 났을 때 터미널에 상세 내용 출력
    console.error('OG Image Generation Error:', e);
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    });
  }
}