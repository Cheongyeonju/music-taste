'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { QUESTIONS, RECIPES, DishCode, ChefInfo } from '@/constants/dishData';

// 1. 다국어 텍스트 딕셔너리 정의
const UI_TEXT = {
  en: {
    introTitle: <>What&apos;s Your <br/><span className="text-neon-gradient">Music Tasty?</span></>,
    introDesc: <>Discover your musical flavor.<br/>Select ingredients to find your perfect dish.</>,
    startBtn: "Start Tasting",
    step: "STEP",
    back: "← Back",
    ticketTitle: "Order Ticket",
    analysis: "Analysis",
    tastingNotes: "Tasting Notes",
    headChefs: "Head Chefs",
    playBtn: "Play Recipe",
    homeBtn: "Home",
    shareBtn: "Share Result",
    metrics: [
      { label: 'BASE', left: 'Melody', right: 'Story' },
      { label: 'INTENSITY', left: 'Mild', right: 'Spicy' },
      { label: 'TEXTURE', left: 'Organic', right: 'Electric' },
      { label: 'GARNISH', left: 'Famous', right: 'Hidden' },
    ]
  },
  ko: {
    introTitle: <>당신의 음악 취향은 <br/><span className="text-neon-gradient">무슨 맛인가요?</span></>,
    introDesc: <>나만의 음악 레시피를 찾아보세요.<br/>재료를 고르면 딱 맞는 요리가 나옵니다.</>,
    startBtn: "주문하기",
    step: "단계",
    back: "← 뒤로",
    ticketTitle: "주문 내역서",
    analysis: "미각 분석",
    tastingNotes: "시식 한줄평",
    headChefs: "담당 셰프",
    playBtn: "레시피 맛보기",
    homeBtn: "처음으로",
    shareBtn: "영수증 공유하기",
    metrics: [
      { label: '베이스', left: '선율', right: '서사' },
      { label: '맵기', left: '순한맛', right: '매운맛' },
      { label: '식감', left: '자연산', right: '가공' },
      { label: '고명', left: '유명한', right: '숨겨진' },
    ]
  }
};

// 메트릭 값 매핑 (언어 변경되어도 로직은 유지)
const METRIC_VALUES = [
  { leftVal: 'S', rightVal: 'B' },
  { leftVal: 'C', rightVal: 'D' },
  { leftVal: 'O', rightVal: 'P' },
  { leftVal: 'F', rightVal: 'H' },
];

const MusicTaste = () => {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'ko'>('en'); // 언어 상태 관리
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<DishCode[]>([]);
  const [finalResult, setFinalResult] = useState(RECIPES['default']);

  const t = UI_TEXT[lang]; // 현재 언어 텍스트 선택

  const handleSelect = (value: DishCode) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(99); 
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    if (step === 99) {
      setStep(QUESTIONS.length);
      setAnswers(prev => prev.slice(0, -1));
      return;
    }
    setStep(prev => prev - 1);
    setAnswers(prev => prev.slice(0, -1));
  };

  const getRandomChefs = (allChefs: ChefInfo[]) => {
    return [...allChefs].sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  useEffect(() => {
    if (step === 99) {
      const code = answers.join('');
      const foundRecipe = RECIPES[code] || RECIPES['default'];
      const randomChefs = getRandomChefs(foundRecipe.chefs);
      
      setFinalResult({
        ...foundRecipe,
        chefs: randomChefs
      });
    }
  }, [step, answers]);

  const handleShare = async () => {
    try {
      const shareData = {
        title: lang === 'en' ? "What's Your Music Tasty?" : "당신의 음악 취향은 무슨 맛?",
        text: `My Music Taste is: ${finalResult.name} ${finalResult.emoji}`,
        url: window.location.href,
      };
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(lang === 'en' ? 'Link copied! 📋' : '링크가 복사되었습니다! 📋');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // 섹션 구분선 컴포넌트
  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mb-3 mt-1">
      <div className="flex-1 h-px border-t border-dashed border-gray-300"></div>
      <span className="shrink-0 text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {title}
      </span>
      <div className="flex-1 h-px border-t border-dashed border-gray-300"></div>
    </div>
  );

  const progress = (step / QUESTIONS.length) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 font-sans text-white select-none relative">
      
      {/* [NEW] Language Toggle (Top Right) */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setLang(prev => prev === 'en' ? 'ko' : 'en')}
          className="bg-gray-800/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold border border-gray-600 hover:bg-gray-700 transition flex gap-2"
        >
          <span className={lang === 'ko' ? 'text-white' : 'text-gray-500'}>KO</span>
          <span className="text-gray-600">|</span>
          <span className={lang === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
        </button>
      </div>

      {/* ================= Intro (Step 0) ================= */}
      {step === 0 && (
        <div className="text-center space-y-6 animate-fade-in max-w-2xl relative">
          <div className="inline-block p-4 rounded-full bg-gray-800 border border-gray-700 mb-4 shadow-xl">
             <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">🧾</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
            {t.introTitle}
          </h1>
          <p className="text-gray-400 text-lg">
            {t.introDesc}
          </p>
          <button 
            onClick={() => setStep(1)}
            className="mt-4 px-10 py-4 bg-neon-gradient text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
          >
            {t.startBtn}
          </button>
        </div>
      )}

      {/* ================= Questions (Step 1~4) ================= */}
      {step >= 1 && step <= 4 && (
        <div className="w-full max-w-lg space-y-4 animate-slide-up relative">
          <div className="flex items-center justify-between mb-2">
            <button onClick={handleBack} className="text-gray-500 hover:text-white text-sm font-bold flex items-center gap-1 transition">
              {t.back}
            </button>
            <span className="text-xs font-bold text-purple-400 bg-purple-900/20 px-3 py-1 rounded-full border border-purple-500/30">
              {t.step} 0{step}
            </span>
          </div>

          <div className="h-1.5 w-full bg-gray-800 rounded-full mb-8 overflow-hidden">
             <div className="h-full bg-neon-gradient transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="bg-[#121212] border border-gray-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
             <h2 className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-2">
               {QUESTIONS[step-1].category}
             </h2>
             <h3 className="text-2xl font-bold mb-6 leading-snug break-keep">
               {/* [알림] 질문 데이터(QUESTIONS) 자체도 다국어 처리가 필요하다면 
                 dishData.ts 구조를 변경해야 합니다. 현재는 영문 데이터가 나옵니다. 
               */}
               {QUESTIONS[step-1].query}
             </h3>

             <div className="grid gap-3">
              {QUESTIONS[step-1].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.value as DishCode)}
                  className="group p-5 bg-[#1A1A1A] border border-gray-700 rounded-xl text-left hover:border-purple-500 hover:bg-[#202020] transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold group-hover:text-purple-300 break-keep">{opt.text}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1 break-keep">{opt.subtext}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= Result (Order Ticket) ================= */}
      {step === 99 && (
        <div className="w-full max-w-sm animate-slide-up pb-10">
          
          <div className="bg-white text-black p-5 rounded-t-xl shadow-2xl relative font-mono pb-8">
            
            {/* 1. Header */}
            <div className="text-center border-b-2 border-dashed border-gray-300 pb-3 mb-4">
              <h2 className="text-xl font-black tracking-tighter uppercase">{t.ticketTitle}</h2>
              <p className="text-[10px] text-gray-600 mt-0.5">{new Date().toLocaleDateString()}</p>
            </div>

            {/* 2. Main Result */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">{finalResult.emoji}</div>
              <h3 className="text-lg font-black uppercase leading-tight mb-1">{finalResult.name}</h3>
              <p className="text-[10px] text-gray-700 font-sans leading-relaxed px-1 break-keep">
                 {/* 결과 설명도 dishData.ts에 한국어 데이터가 없다면 영문으로 나옵니다 */}
                {finalResult.description}
              </p>
            </div>

            {/* 3. Analysis Section (Translated) */}
            <div className="mb-6">
              <SectionDivider title={t.analysis} />
              
              <div className="space-y-2">
                {t.metrics.map((metric, idx) => {
                  const values = METRIC_VALUES[idx];
                  const isLeftSelected = answers[idx] === values.leftVal;
                  
                  return (
                    <div key={idx} className="flex items-center justify-between text-[9px] h-5 border-b border-dotted border-gray-200 last:border-0">
                      
                      {/* Left Column: Label */}
                      <span className="font-bold text-gray-600 uppercase tracking-wider w-20 shrink-0 whitespace-nowrap text-left">
                        {idx + 1}. {metric.label}
                      </span>

                      {/* Right Column: Options */}
                      <div className="w-48 grid grid-cols-2 gap-1"> 
                        <div className={`flex items-center gap-1.5 ${isLeftSelected ? 'text-black font-bold' : 'text-gray-400'}`}>
                          <span className="text-[10px] w-3 text-center shrink-0">{isLeftSelected ? '☑' : '☐'}</span>
                          <span className="truncate">{metric.left}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${!isLeftSelected ? 'text-black font-bold' : 'text-gray-400'}`}>
                          <span className="text-[10px] w-3 text-center shrink-0">{!isLeftSelected ? '☑' : '☐'}</span>
                          <span className="truncate">{metric.right}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Tags Section */}
            <div className="mb-6">
              <SectionDivider title={t.tastingNotes} />

              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {finalResult.tags.slice(0, 3).map((tag) => ( 
                  <span key={tag} className="px-2 py-0.5 rounded border bg-purple-50 border-purple-200 text-purple-700 text-[10px] font-bold uppercase tracking-wide">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Chefs Section */}
            <div className="mb-4">
               <SectionDivider title={t.headChefs} />

              <div className="flex justify-center gap-4 pt-1">
                {finalResult.chefs && finalResult.chefs.map((chef, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 w-20">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl shadow-sm border border-gray-200 text-gray-700">
                        👨‍🍳
                      </div>
                      <span className={`absolute -bottom-1 -right-1 text-[7px] font-bold px-1 py-px rounded text-white border border-white ${chef.region === 'KR' ? 'bg-black' : 'bg-gray-500'}`}>
                        {chef.region}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-gray-800 text-center leading-tight break-words w-full truncate">
                      {chef.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Barcode */}
            <div className="mt-8 pt-2 flex justify-center opacity-60">
              <div className="h-5 w-28 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover"></div>
            </div>

            {/* Footer Brand */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-300 flex items-center justify-center gap-2 opacity-90">
                <div className="relative w-5 h-5"> 
                    <Image src="/logo_icon.png" alt="Logo Icon" fill className="object-contain" />
                </div>
                <div className="relative w-16 h-4">
                    <Image src="/logo_text.png" alt="unlisted" fill className="object-contain" />
                </div>
            </div>
            
            {/* Jagged Edge */}
             <div className="absolute bottom-[-10px] left-0 w-full h-[10px] bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-2 px-2">
            <div className="flex gap-2">
              <button onClick={() => router.push('/radio')} className="flex-[2] py-3 bg-neon-gradient text-white rounded-lg font-bold text-xs shadow-lg shadow-purple-900/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-1">
                <span>🎧</span> {t.playBtn}
              </button>
              <button onClick={() => window.location.href = '/'} className="flex-1 py-3 bg-[#1A1A1A] border border-gray-700 text-gray-300 rounded-lg font-bold hover:bg-[#252525] hover:text-white transition text-xs flex items-center justify-center gap-1">
                <span>🏠</span> {t.homeBtn}
              </button>
            </div>
            <button onClick={handleShare} className="w-full py-3 bg-white text-black rounded-lg font-bold text-xs hover:bg-gray-200 transition flex items-center justify-center gap-1 shadow-sm">
              <span>🔗</span> {t.shareBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicTaste;