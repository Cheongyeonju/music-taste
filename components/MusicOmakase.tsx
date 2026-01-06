'use client';

import React, { useState } from 'react';
import { QUESTIONS, RECIPES, DishCode } from '@/constants/dishData';

const MusicOmakase = () => {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<DishCode[]>([]);

  const handleSelect = (value: DishCode) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(99); 
    }
  };

  const getResult = () => {
    // 실제 로직 구현 전까지는 예시 데이터 반환
    return RECIPES['COSF'] || RECIPES['default']; 
  };

  const result = getResult();
  const progress = (step / QUESTIONS.length) * 100;

  return (
    // 전체 배경을 사이트와 동일한 어두운 톤으로 설정
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* ================= Intro Section ================= */}
      {step === 0 && (
        <div className="text-center space-y-8 animate-fade-in max-w-2xl">
          {/* 아이콘에 네온 효과 추가 */}
          <div className="text-7xl drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">🍽️</div>
          <h1 className="text-5xl font-extrabold tracking-tight">
            What's Your <br />
            {/* 타이틀에 그라데이션 텍스트 적용 */}
            <span className="text-neon-gradient">Music Taste?</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover the flavor of your playlist through our digital omakase course.
          </p>
          {/* 플랫폼 스타일의 그라데이션 버튼 */}
          <button 
            onClick={() => setStep(1)}
            className="px-12 py-4 bg-neon-gradient text-white font-bold rounded-full text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            Start Tasting Session
          </button>
        </div>
      )}

      {/* ================= Question Section ================= */}
      {step >= 1 && step <= 4 && (
        <div className="w-full max-w-xl space-y-8 animate-slide-up">
          {/* Progress Bar */}
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-neon-gradient h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="text-center relative">
            <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">
              Course {step} / {QUESTIONS.length}
            </span>
            <h2 className="text-3xl font-bold mt-4 leading-snug">{QUESTIONS[step-1].query}</h2>
          </div>

          <div className="grid gap-4">
            {QUESTIONS[step-1].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt.value as DishCode)}
                // 선택지 버튼: 어두운 배경, 호버 시 테두리 발광 및 그라데이션 텍스트 효과
                className="group p-6 bg-[#1A1A1A] border border-gray-800 rounded-2xl text-left flex items-center justify-between transition-all duration-300 hover:border-purple-500 hover:bg-[#252525] border-neon-glow"
              >
                <div>
                  <div className="text-xl font-bold group-hover:text-purple-300 transition">{opt.text}</div>
                  <div className="text-sm text-gray-400 mt-2 group-hover:text-gray-300">{opt.subtext}</div>
                </div>
                <span className="text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-purple-500">
                  ➔
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= Result Section (Digital Receipt) ================= */}
      {step === 99 && (
        // 영수증을 사이버펑크 스타일의 데이터 패널로 변경
        <div className="bg-[#121212] border border-gray-800 p-8 w-full max-w-sm rounded-3xl shadow-2xl relative font-sans overflow-hidden border-neon-glow animate-slide-up">
          {/* 상단 장식용 그라데이션 라인 */}
          <div className="absolute top-0 left-0 w-full h-1 bg-neon-gradient"></div>

          <div className="text-center border-b border-gray-800 pb-6 mb-6">
            <h2 className="text-sm font-bold tracking-[0.2em] text-purple-400 uppercase mb-2">Analysis Complete</h2>
            <p className="text-3xl font-extrabold">Your Music Flavor</p>
          </div>

          <div className="text-center mb-8 relative z-10">
            <div className="text-7xl mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">{result.emoji}</div>
            {/* 결과 타이틀 그라데이션 */}
            <h3 className="text-2xl font-black uppercase mb-3 text-neon-gradient">{result.name}</h3>
            <p className="text-gray-300 leading-relaxed">{result.description}</p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {result.tags.map((tag: string) => (
                // 태그 스타일 변경: 반투명 그라데이션 배경
                <span key={tag} className="bg-purple-900/30 border border-purple-500/30 text-purple-200 text-xs px-3 py-1.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#1A1A1A] p-5 rounded-2xl text-center border border-gray-800 relative overflow-hidden group">
            <div className="absolute inset-0 bg-neon-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <p className="text-sm text-gray-400 mb-3 relative z-10">Ready to own this taste recipe?</p>
            <button className="w-full bg-neon-gradient text-white py-3.5 rounded-xl font-bold text-lg hover:opacity-90 transition-transform hover:scale-[1.02] shadow-lg shadow-purple-900/20 relative z-10">
              Buy Shares (MELODY)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicOmakase;