import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // 1. 폰트 로드: 끊김 없는 JSDelivr 서버 사용 (가장 안정적)
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/gh/google/fonts/ofl/nanumgothic/NanumGothic-Bold.ttf'
  ).then((res) => {
    if (!res.ok) throw new Error('Font fetch failed');
    return res.arrayBuffer();
  }).catch(() => null); // 폰트 로드 실패 시 null 반환 (에러 화면 방지)

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
          // 폰트가 있으면 나눔고딕, 실패하면 시스템 기본 폰트 사용
          fontFamily: fontData ? '"NanumGothic"' : 'sans-serif',
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

        {/* 하단 텍스트 (물음표 잘림 방지 적용됨) */}
        <div style={{ display: 'flex', fontSize: 60, fontWeight: 700, alignItems: 'center' }}>
          <span style={{ color: '#a855f7' }}>MUSIC</span>
          <span style={{ width: 15 }} />
          <span style={{ color: '#60a5fa' }}>TASTY?</span>
          {/* 투명 스페이서로 공간 확보 */}
          <span style={{ width: 10, height: 10 }} />
        </div>
      </div>
    ),
    {
      width: 800,
      height: 420,
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
}