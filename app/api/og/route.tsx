import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // 1. 폰트 로드: 가장 단순하고 확실한 방법으로 변경
    const fontData = await fetch(
      'https://fonts.gstatic.com/s/nanumgothic/v23/PN_3Rfi-oW3hYwmKDpxS7F_z-7r5.ttf'
    ).then((res) => {
      if (!res.ok) throw new Error('Font network error');
      return res.arrayBuffer();
    });

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
          {/* 로고 아이콘 */}
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

          {/* 하단 텍스트 */}
          <div style={{ display: 'flex', fontSize: 60, fontWeight: 700, alignItems: 'center' }}>
            <span style={{ color: '#a855f7' }}>MUSIC</span>
            <span style={{ width: 15 }} />
            <span style={{ color: '#60a5fa' }}>TASTY?</span>
            
            {/* ★ [수정] 물음표 잘림 방지용 투명 스페이서 (가장 안전한 방법) */}
            {/* 글자 뒤에 10px짜리 빈 공간을 강제로 만듭니다. */}
            <span style={{ width: 10, height: 10 }} /> 
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
    // 에러 발생 시 빈 화면 대신 에러 메시지를 띄웁니다.
    return new Response(`Image Generation Failed: ${e.message}`, {
      status: 500,
    });
  }
}