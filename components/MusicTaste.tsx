'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { RECIPES, RECIPES_KO, DishCode, ChefInfo } from '@/constants/dishData';

// [타입 정의]
interface Option {
  text: string;
  subtext: string;
  value: string;
  icon: string;
}

interface Question {
  category: string;
  query: string;
  options: Option[];
}

// [상수 데이터]
const QUESTIONS_EN: Question[] = [
  {
    category: 'BASE',
    query: 'What determines the first impression of the music?',
    options: [
      { text: 'Addictive Melody', subtext: 'Sweet and catchy tune', value: 'S', icon: '🎵' },
      { text: 'Sensational Beat', subtext: 'Rhythm that hits the heart', value: 'S', icon: '🥁' },
      { text: 'Relatable Lyrics', subtext: 'Words that speak my mind', value: 'B', icon: '📝' },
      { text: 'Cinematic Story', subtext: 'Narrative that sparks imagination', value: 'B', icon: '🎬' }
    ]
  },
  {
    category: 'INTENSITY',
    query: 'How spicy would you like your music today?',
    options: [
      { text: 'Mild (Easy)', subtext: 'Comfortable easy-listening', value: 'C', icon: '☁️' },
      { text: 'Calm (Healing)', subtext: 'Soothing comfort for the mind', value: 'C', icon: '🍂' },
      { text: 'Spicy (Strong)', subtext: 'Intense stimulation to wake up', value: 'D', icon: '🔥' },
      { text: 'Wild (Dynamic)', subtext: 'Powerful stress reliever', value: 'D', icon: '🌪️' }
    ]
  },
  {
    category: 'TEXTURE',
    query: 'What musical texture do you prefer?',
    options: [
      { text: 'Raw (Natural)', subtext: 'Unpolished voice & acoustic', value: 'O', icon: '🪵' },
      { text: 'Organic (Warm)', subtext: 'Warm and human resonance', value: 'O', icon: '🎸' },
      { text: 'Electric (Processed)', subtext: 'Sophisticated synth sound', value: 'P', icon: '⚡' },
      { text: 'Trendy (Fusion)', subtext: 'Dreamy and hip effects', value: 'P', icon: '🌌' }
    ]
  },
  {
    category: 'GARNISH',
    query: 'Choose a topping to complete the flavor.',
    options: [
      { text: 'Classic Topping', subtext: 'Familiar taste that enhances the base', value: 'F', icon: '🧀' },
      { text: 'Bestseller', subtext: 'Verified taste loved by everyone', value: 'F', icon: '🏆' },
      { text: 'Special Topping', subtext: 'Newness that adds a kick', value: 'H', icon: '✨' },
      { text: 'Limited Edition', subtext: 'Rare taste just for me', value: 'H', icon: '💎' }
    ]
  }
];

const QUESTIONS_KO: Question[] = [
  {
    category: '베이스 (BASE)',
    query: '음악의 첫인상을 결정하는 재료는 무엇인가요?',
    options: [
      { text: '중독성 있는 멜로디', subtext: '한 번 들으면 잊을 수 없는 선율', value: 'S', icon: '🎵' },
      { text: '감각적인 비트', subtext: '심장을 울리는 리듬감', value: 'S', icon: '🥁' },
      { text: '공감되는 가사', subtext: '내 마음을 대변하는 문장들', value: 'B', icon: '📝' },
      { text: '영화 같은 세계관', subtext: '상상력을 자극하는 스토리', value: 'B', icon: '🎬' }
    ]
  },
  {
    category: '맵기 (INTENSITY)',
    query: '오늘 들을 음악의 맵기는 어느 정도로 할까요?',
    options: [
      { text: '순한맛 (Easy)', subtext: '귀가 편안한 이지리스닝', value: 'C', icon: '☁️' },
      { text: '담백한맛 (Calm)', subtext: '마음을 차분하게 하는 위로', value: 'C', icon: '🍂' },
      { text: '매운맛 (Spicy)', subtext: '졸음을 깨우는 강렬한 자극', value: 'D', icon: '🔥' },
      { text: '화끈한맛 (Wild)', subtext: '스트레스를 날리는 파격', value: 'D', icon: '🌪️' }
    ]
  },
  {
    category: '질감 (TEXTURE)',
    query: '어떤 음악적 질감을 선호하시나요?',
    options: [
      { text: '자연식 (Raw)', subtext: '꾸밈없는 목소리와 통기타', value: 'O', icon: '🪵' },
      { text: '유기농 (Acoustic)', subtext: '따뜻하고 인간적인 울림', value: 'O', icon: '🎸' },
      { text: '가공 (Electric)', subtext: '세련된 신디사이저 사운드', value: 'P', icon: '⚡' },
      { text: '퓨전 (Trendy)', subtext: '몽환적이고 힙한 이펙트', value: 'P', icon: '🌌' }
    ]
  },
  {
    category: '토핑 (GARNISH)',
    query: '음악의 풍미를 완성할 토핑을 선택해주세요.',
    options: [
      { text: '클래식 토핑', subtext: '재료 본연의 맛을 살리는 익숙함', value: 'F', icon: '🧀' },
      { text: '베스트셀러', subtext: '모두가 인정하는 검증된 맛', value: 'F', icon: '🏆' },
      { text: '스페셜 토핑', subtext: '기대 이상의 킥을 더하는 새로움', value: 'H', icon: '✨' },
      { text: '리미티드 에디션', subtext: '나만 알고 싶은 희소성', value: 'H', icon: '💎' }
    ]
  }
];

const UI_TEXT = {
  en: {
    introTitle: <>What&apos;s Your <br/><span className="text-neon-gradient">Music Tasty?</span></>,
    introDesc: <>What flavor is your music?<br/>Analyze your taste and create a playlist.</>,
    startBtn: "Start Analysis",
    step: "STEP",
    back: "← Back",
    ticketTitle: "Tasty Result",
    analysis: "Taste Graph",
    tastingNotes: "Flavor Notes",
    headChefs: "Similar Artists",
    playBtn: "Listen Playlist",
    homeBtn: "Home",
    shareBtn: "Share Result",
    shareMenuTitle: "Share",
    copyLink: "Copy Link",
    shareImage: "Share Image (Instagram, etc.)",
    saveBtn: "Save Img",
    metrics: [
      { label: 'BASE', left: 'Melody', right: 'Story' },
      { label: 'INTENSITY', left: 'Mild', right: 'Spicy' },
      { label: 'TEXTURE', left: 'Organic', right: 'Electric' },
      { label: 'GARNISH', left: 'Famous', right: 'Hidden' },
    ]
  },
  ko: {
    introTitle: <>당신의 음악은 <br/><span className="text-neon-gradient">무슨 맛인가요?</span></>,
    introDesc: <>당신의 귀가 가장 좋아하는 &apos;맛&apos;을 찾아,<br/>세상에 없던 특별한 메뉴를 제공합니다.</>,
    startBtn: "테스트 시작하기",
    step: "단계",
    back: "← 뒤로",
    ticketTitle: "MUSIC TASTY",
    analysis: "취향 분석표",
    tastingNotes: "테이스팅 노트",
    headChefs: "추천 아티스트",
    playBtn: "플레이리스트 바로 듣기",
    homeBtn: "처음으로",
    shareBtn: "결과 공유하기",
    shareMenuTitle: "공유하기",
    copyLink: "링크 복사",
    shareImage: "이미지로 공유 (인스타그램 등)",
    saveBtn: "이미지 저장",
    metrics: [
      { label: '베이스', left: '선율', right: '서사' },
      { label: '맵기', left: '순한맛', right: '매운맛' },
      { label: '질감', left: '자연식', right: '가공' },
      { label: '토핑', left: '클래식', right: '스페셜' },
    ]
  }
};

const METRIC_VALUES = [
  { leftVal: 'S', rightVal: 'B' },
  { leftVal: 'C', rightVal: 'D' },
  { leftVal: 'O', rightVal: 'P' },
  { leftVal: 'F', rightVal: 'H' },
];

const MusicTaste = () => {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'ko'>('en'); 
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<DishCode[]>([]);
  const [resultCode, setResultCode] = useState<string>('default');
  const [chefs, setChefs] = useState<ChefInfo[]>([]);
  const [emoji, setEmoji] = useState<string>('🍽️');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);

  const ticketRef = useRef<HTMLDivElement>(null);

  const t = UI_TEXT[lang];
  const currentQuestions = lang === 'ko' ? QUESTIONS_KO : QUESTIONS_EN;

  const handleSelect = (idx: number, value: DishCode) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setTimeout(() => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);
        if (step < currentQuestions.length) setStep(step + 1);
        else setStep(99);
        setSelectedOption(null);
    }, 400); 
  };

  const handleBack = () => {
    if (step === 0) return;
    if (step === 99) {
      setStep(currentQuestions.length);
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
      setResultCode(code); 
      setChefs(randomChefs); 
      setEmoji(foundRecipe.emoji); 
    }
  }, [step, answers]);

  const getResultText = () => {
    if (lang === 'ko') return RECIPES_KO[resultCode] || RECIPES_KO['default'];
    return RECIPES[resultCode] || RECIPES['default'];
  };
  
  const finalResultData = getResultText();

  // [이미지 생성 헬퍼 함수]
  const generateImageBlob = async (): Promise<Blob | null> => {
    const targetElement = document.getElementById('printable-receipt-area');
    if (!targetElement) return null;

    try {
      const canvas = await html2canvas(targetElement, { 
        backgroundColor: null, // 투명 배경 (부모 따름)
        scale: 3, 
        useCORS: true, 
        logging: false,
        onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById('printable-receipt-area');
            if (clonedElement) {
                clonedElement.style.width = '360px';
                clonedElement.style.borderRadius = '16px 16px 0 0'; 
                // 자간 축소 (html2canvas 특유의 폰트 퍼짐 보정)
                clonedElement.style.letterSpacing = '-0.5px'; 
            }
        }
      });
      return new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
    } catch (e) {
      console.error("Canvas generation failed", e);
      return null;
    }
  };

  // [링크 복사 함수] - 안전 장치 추가
  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/share/${resultCode}`;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        alert(lang === 'en' ? 'Link Copied!' : '링크가 복사되었습니다!');
      } else {
        // HTTP 환경 등 clipboard API 미지원 시
        prompt(lang === 'en' ? 'Copy this link:' : '아래 링크를 복사하세요:', url);
      }
      setIsShareModalOpen(false); 
    } catch (err) {
      console.error(err);
      alert('링크 복사에 실패했습니다.');
    }
  };

  // [인스타그램/네이티브 공유 함수]
  const handleInstagramShare = async () => {
    if (isSaving) return;
    setIsSaving(true);
    
    try {
      // 1. 링크 복사 시도 (실패해도 무관)
      const url = `${window.location.origin}/share/${resultCode}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
         await navigator.clipboard.writeText(url).catch(() => {}); 
      }

      // 2. 이미지 Blob 생성
      const blob = await generateImageBlob();
      if (!blob) throw new Error('이미지 생성 실패');

      const fileName = `MusicTasty_${finalResultData.name.replace(/\s+/g, '_')}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // 3. Web Share API 호출
      // navigator.canShare가 있고, share가 가능한지 확인
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Music Tasty Result',
          text: '나의 음악 취향 결과! (링크가 복사되었습니다)', 
        });
      } else {
        // 4. 폴백: PC나 인앱브라우저 등 네이티브 공유 미지원 시 -> 이미지 저장 팝업 띄움
        const imageUrl = URL.createObjectURL(blob);
        setSavedImageUrl(imageUrl);
      }
    } catch (err) {
      console.error('공유 프로세스 오류:', err);
      // 최후의 수단: 저장 팝업
      alert(lang === 'en'
        ? 'Sharing is not supported on this browser. Please save the image.'
        : '이 브라우저에서는 바로 공유가 지원되지 않습니다. 이미지를 저장해주세요.');
    } finally {
      setIsSaving(false);
      setIsShareModalOpen(false);
    }
  };

  // 구분선 컴포넌트
  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 mb-3 mt-1">
      {/* Tailwind 색상(gray-300) 대신 HEX(#d1d5db) 사용 -> lab 오류 방지 */}
      <div className="flex-1 h-px border-t border-dashed border-[#d1d5db]"></div>
      {/* 텍스트 정렬 보정 (-mt-[2px]) 및 HEX 색상 적용 */}
      <span className="shrink-0 text-[10px] font-black text-[#9ca3af] uppercase tracking-widest -mt-[2px]">{title}</span>
      <div className="flex-1 h-px border-t border-dashed border-[#d1d5db]"></div>
    </div>
  );

  const progress = (step / currentQuestions.length) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 font-sans text-white select-none relative">
      
      {/* 상단바: 홈 버튼 + 언어 변경 */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {step === 99 && (
           <button onClick={() => window.location.href = '/'} className="bg-gray-800/80 backdrop-blur w-8 h-8 flex items-center justify-center rounded-full border border-gray-600 hover:bg-gray-700 transition">
             <span className="text-sm">🏠</span>
           </button>
        )}
        <button 
          onClick={() => setLang(prev => prev === 'en' ? 'ko' : 'en')}
          className="bg-gray-800/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold border border-gray-600 hover:bg-gray-700 transition flex gap-2"
        >
          <span className={lang === 'ko' ? 'text-white' : 'text-gray-500'}>KO</span><span className="text-gray-600">|</span><span className={lang === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
        </button>
      </div>

      {step === 0 && (
        <div className="text-center space-y-6 animate-fade-in max-w-2xl relative">
          <div className="inline-block p-4 rounded-full bg-gray-800 border border-gray-700 mb-6 shadow-xl relative overflow-visible">
             <div className="relative w-14 h-14 flex items-center justify-center filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
               <span className="text-[3.5rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90 select-none">🍽️</span>
               <span className="text-[1.5rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 select-none drop-shadow-lg mt-1">🎵</span>
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
            {t.introTitle}
          </h1>
          <p className="text-gray-400 text-lg">{t.introDesc}</p>
          <button onClick={() => setStep(1)} className="mt-4 px-10 py-4 bg-neon-gradient text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">
            {t.startBtn}
          </button>
        </div>
      )}

      {step >= 1 && step <= 4 && (
        <div className="w-full max-w-lg space-y-4 animate-slide-up relative">
          <div className="flex items-center justify-between mb-2">
            <button onClick={handleBack} className="text-gray-500 hover:text-white text-sm font-bold flex items-center gap-1 transition">{t.back}</button>
            <span className="text-xs font-bold text-purple-400 bg-purple-900/20 px-3 py-1 rounded-full border border-purple-500/30">{t.step} 0{step}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full mb-8 overflow-hidden">
             <div className="h-full bg-neon-gradient transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
          <div key={step} className="bg-[#121212] border border-gray-800 p-6 rounded-2xl shadow-xl relative overflow-hidden animate-fade-in">
             <h2 className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-2">{currentQuestions[step-1].category}</h2>
             <h3 className="text-2xl font-bold mb-6 leading-snug break-keep">{currentQuestions[step-1].query}</h3>
             <div className="grid gap-3">
              {currentQuestions[step-1].options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button key={idx} onClick={() => handleSelect(idx, opt.value as DishCode)} disabled={selectedOption !== null} 
                    className={`group p-5 border rounded-xl text-left transition-all duration-200 flex items-center justify-between ${isSelected ? 'bg-purple-600 border-purple-500 text-white scale-[1.02] shadow-lg shadow-purple-900/50' : 'bg-[#1A1A1A] border-gray-700 hover:border-purple-500 hover:bg-[#202020]'}`}>
                    <div>
                      <span className={`text-lg font-bold break-keep ${isSelected ? 'text-white' : 'group-hover:text-purple-300'}`}>
                          <span className="mr-2">{opt.icon}</span>{opt.text}
                      </span>
                      <div className={`text-sm mt-1 break-keep leading-relaxed ${isSelected ? 'text-purple-200' : 'text-gray-400'}`}>{opt.subtext}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 결과 화면 (영수증) */}
      {step === 99 && (
        <div className="w-full max-w-sm animate-slide-up pb-10 relative z-10">
          
          {/* 영수증 컨테이너 */}
          {/* bg-[#f8f8f4]와 text-[#1f2937] 사용으로 html2canvas 오류 방지 */}
          <div ref={ticketRef} className="relative font-mono rounded-t-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-[#f8f8f4] text-[#1f2937]">
            
            {/* ★ 캡처 대상 영역 (ID: printable-receipt-area) ★ */}
            <div id="printable-receipt-area" className="relative bg-[#f8f8f4] rounded-t-2xl">
                
                <div className="p-5 pb-0">
                    {/* 영수증 헤더 */}
                    <div className="text-center border-b-2 border-dashed border-[#d1d5db] pb-4 mb-5">
                        <h2 className="text-xl font-black tracking-tight uppercase">{t.ticketTitle}</h2>
                        <p className="text-[10px] text-[#6b7280] mt-1">{new Date().toLocaleDateString()}</p>
                    </div>

                    {/* 결과 메인 */}
                    <div className="text-center mb-6">
                        <div className="text-5xl mb-3">{emoji}</div>
                        <h3 className="text-lg font-black uppercase leading-tight mb-2">{finalResultData.name}</h3>
                        <p className="text-[10px] text-[#4b5563] font-sans leading-relaxed px-1 break-keep">{finalResultData.description}</p>
                    </div>

                    {/* 분석 그래프 (HEX 색상 강제 적용) */}
                    <div className="mb-6">
                        <SectionDivider title={t.analysis} />
                        <div className="space-y-2">
                            {t.metrics.map((metric, idx) => {
                            const values = METRIC_VALUES[idx];
                            const isLeftSelected = answers[idx] === values.leftVal;
                            return (
                                <div key={idx} className="flex items-center justify-between py-1 border-b border-dotted border-[#e5e7eb] last:border-0">
                                    {/* text-[#374151] 등 HEX 코드로 Tailwind 변수 대체 */}
                                    <span className="font-bold text-[#374151] uppercase tracking-wider w-16 shrink-0 whitespace-nowrap text-left text-[10px]">{idx + 1}. {metric.label}</span>
                                    <div className="w-full grid grid-cols-2 gap-2 ml-2">
                                        <div className={`flex items-center gap-1.5 ${isLeftSelected ? 'text-black font-bold' : 'text-[#9ca3af]'}`}>
                                            <span className="text-[10px] w-3 text-center shrink-0">{isLeftSelected ? '☑' : '☐'}</span>
                                            <span className="text-[10px] whitespace-nowrap">{metric.left}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${!isLeftSelected ? 'text-black font-bold' : 'text-[#9ca3af]'}`}>
                                            <span className="text-[10px] w-3 text-center shrink-0">{!isLeftSelected ? '☑' : '☐'}</span>
                                            <span className="text-[10px] whitespace-nowrap">{metric.right}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                            })}
                        </div>
                    </div>

                    {/* 테이스팅 노트 (HEX 색상 강제 적용) */}
                    <div className="mb-6">
                        <SectionDivider title={t.tastingNotes} />
                        <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                            {finalResultData.tags.slice(0, 3).map((tag) => ( 
                            <span key={tag} className="px-2 py-0.5 rounded border bg-[#faf5ff] border-[#e9d5ff] text-[#7e22ce] text-[10px] font-bold uppercase tracking-wide">#{tag}</span>
                            ))}
                        </div>
                    </div>
                
                    {/* 추천 아티스트 (HEX 색상 강제 적용) */}
                    <div className="mb-2">
                        <SectionDivider title={t.headChefs} />
                        <div className="flex justify-center gap-3 pt-1">
                            {chefs && chefs.map((chef, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1 w-20">
                                <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-xl shadow-sm border border-[#e5e7eb] text-[#374151]">👨‍🍳</div>
                                <span className={`absolute -bottom-1 -right-1 text-[7px] font-bold px-1 py-px rounded text-white border border-white ${chef.region === 'KR' ? 'bg-black' : 'bg-[#6b7280]'}`}>{chef.region}</span>
                                </div>
                                <div className="h-8 flex items-center justify-center w-full">
                                    <span className="text-[10px] font-bold text-[#1f2937] text-center leading-tight break-keep">{chef.name}</span>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Footer Logo */}
                    <div className="mt-4 pt-3 border-t-2 border-dashed border-[#d1d5db] flex items-center justify-center gap-3 opacity-80 pb-8">
                        <div className="w-6 h-6 flex items-center justify-center"> 
                            <img src="/logo_symbol.png" alt="Symbol" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-20 h-5 flex items-center justify-center"> 
                            <img src="/logo_text.png" alt="Logo Type" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>

                {/* 영수증 하단 찢어진 효과 */}
                <div className="absolute bottom-[-10px] left-0 w-full h-[10px] bg-[#f8f8f4]" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
            </div>
            {/* 캡처 대상 영역 끝 */}
            
          </div>

          {/* 하단 버튼 그룹 */}
          <div className="mt-8 flex flex-col gap-3 px-1 relative z-20">
            <button 
                onClick={() => router.push('/radio')} 
                className="w-full py-4 bg-neon-gradient text-white rounded-xl font-bold text-base shadow-lg shadow-purple-900/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
                <span className="text-xl">🎧</span> {t.playBtn}
            </button>

            {/* 통합 공유 버튼 */}
            <button onClick={() => setIsShareModalOpen(true)} className="w-full py-3.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-md">
                <span className="text-xl">🔗</span> {t.shareBtn}
            </button>
          </div>
        </div>
      )}

      {/* 공유 메뉴 팝업 (리스트 형태) */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsShareModalOpen(false)}>
          <div className="w-full max-w-sm bg-[#252525] rounded-t-2xl overflow-hidden transform transition-transform duration-300 ease-out pb-4" onClick={e => e.stopPropagation()}>
            
            <div className="p-4 text-center border-b border-gray-700/50 relative">
               <h3 className="text-white font-bold text-base">{t.shareMenuTitle}</h3>
               <button onClick={() => setIsShareModalOpen(false)} className="absolute right-4 top-4 text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="flex flex-col">
                <button onClick={handleCopyLink} className="flex items-center gap-3 p-5 hover:bg-gray-700/50 transition text-left border-b border-gray-700/50 active:bg-gray-700">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-xl">🔗</span>
                    </div>
                    <span className="text-white font-bold text-sm">{t.copyLink}</span>
                </button>
                
                <button onClick={handleInstagramShare} disabled={isSaving} className="flex items-center gap-3 p-5 hover:bg-gray-700/50 transition text-left active:bg-gray-700">
                    <div className="w-10 h-10 relative flex items-center justify-center">
                        {isSaving ? (
                            <span className="text-xl animate-spin">⏳</span>
                        ) : (
                             <Image 
                                src="/Instagram_logo.png" 
                                alt="Instagram" 
                                fill 
                                className="object-contain p-1" 
                                unoptimized 
                            />
                        )}
                    </div>
                    <span className="text-white font-bold text-sm">{t.shareImage}</span>
                </button>
            </div>
          </div>
        </div>
      )}

      {/* 이미지 저장 안내 팝업 (Web Share 미지원 시 폴백) */}
      {savedImageUrl && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setSavedImageUrl(null)}>
          <div className="max-w-sm w-full bg-white rounded-xl p-4 flex flex-col items-center space-y-4" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg text-black">이미지 저장</h3>
            <p className="text-sm text-gray-500 text-center">
              아래 이미지를 <span className="font-bold text-purple-600">길게 눌러서</span><br/>
              &apos;사진 앱에 저장&apos;을 선택해주세요.
            </p>
            <div className="relative w-full shadow-lg rounded-xl overflow-hidden">
              <img 
                src={savedImageUrl} 
                alt="Saved Result" 
                className="w-full h-auto object-contain"
              />
            </div>
            <button 
              onClick={() => setSavedImageUrl(null)}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicTaste;