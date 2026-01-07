'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function RadioPage() {
  const router = useRouter();

  return (
    // 전체 배경 (완전한 블랙)
    <div className="min-h-screen bg-black text-white flex flex-col relative font-sans">
      
      {/* 1. 상단 네비게이션 */}
      <div className="flex justify-between items-center p-6">
        {/* 뒤로가기 버튼 */}
        <button 
          onClick={() => router.push('/')} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#121212] hover:bg-[#222] transition text-gray-400"
        >
          ←
        </button>

        {/* 우측 상단 유저/시나리오 칩 (이미지 참고) */}
        <div className="flex gap-3">
          <div className="px-3 py-1 rounded-full border border-red-900/50 bg-red-900/20 text-red-500 text-[10px] font-bold flex items-center">
            ((•)) SCENARIO
          </div>
          <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full pl-1 pr-3 py-1">
             <div className="w-6 h-6 rounded-full bg-blue-500 overflow-hidden flex items-center justify-center text-[10px]">
               👤
             </div>
             <div className="flex flex-col leading-none">
               <span className="text-[10px] font-bold text-gray-300">vivian_01</span>
               <span className="text-[8px] text-gray-600">pMLD: 8785</span>
             </div>
             <span className="text-gray-500 text-xs">⌄</span>
          </div>
        </div>
      </div>

      {/* 2. 메인 컨텐츠 (중앙 정렬) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 pb-20">
        
        {/* 앨범 아트 카드 */}
        <div className="w-full aspect-square bg-gradient-to-b from-purple-900 via-pink-800 to-black rounded-3xl relative shadow-2xl mb-8 group overflow-hidden border border-white/5">
          {/* 이미지 플레이스홀더 (분위기 연출용) */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center opacity-80">
                <div className="text-6xl mb-4 blur-sm group-hover:blur-none transition duration-700">🚪</div>
                <div className="w-20 h-20 bg-pink-500 rounded-full blur-[80px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
             </div>
          </div>

          {/* 장르 태그 (우측 상단) */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">TRAP SOUL</span>
          </div>
        </div>

        {/* 재생 바 */}
        <div className="w-full flex items-center gap-3 mb-2">
           <span className="text-[10px] text-gray-500 font-mono">0:00</span>
           <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
             <div className="w-1/3 h-full bg-white rounded-full"></div>
           </div>
           <span className="text-[10px] text-gray-500 font-mono">1:37</span>
        </div>

        {/* 곡 정보 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white mb-1 tracking-tight">lost light</h1>
          <p className="text-sm text-gray-500 font-medium">eric_unlisted</p>
        </div>

        {/* 컨트롤 버튼 */}
        <div className="flex items-center justify-center gap-8 mb-12">
          {/* 닫기/취소 버튼 */}
          <button className="w-12 h-12 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-400 flex items-center justify-center transition">
            ✕
          </button>

          {/* 재생 버튼 (크게) */}
          <button className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          </button>

          {/* 좋아요 버튼 */}
          <button className="w-12 h-12 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-400 flex items-center justify-center transition">
            ♡
          </button>
        </div>

        {/* 투자하기 버튼 (하단 CTA) */}
        <button className="flex items-center gap-2 text-[10px] font-bold text-yellow-500 hover:text-yellow-400 tracking-widest uppercase transition-colors">
          <span>⚡</span> Invest in this track
        </button>

      </div>
    </div>
  );
}