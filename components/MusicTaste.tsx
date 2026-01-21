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
    shareBtn: "Share",
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
    shareBtn: "테스트 공유",
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

  // [이미지 저장 함수]
  const handleDownloadImage = async () => {
    const targetElement = document.getElementById('printable-receipt-area');
    if (!targetElement || isSaving) return;
    setIsSaving(true);
    
    try {
      const canvas = await html2canvas(targetElement, { 
        backgroundColor: '#f8f8f4', // 영수증 배경색과 동일하게 설정
        scale: 2, 
        useCORS: true, 
        logging: false,
        onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById('printable-receipt-area');
            if (clonedElement) {
                // 캡처 시에도 둥근 모서리와 그림자 유지
                clonedElement.style.borderRadius = '16px 16px 0 0'; 
                clonedElement.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }
        }
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      const fileName = `MusicTasty_${finalResultData.name.replace(/\s+/g, '_')}.png`;

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        setSavedImageUrl(imageUrl);
      } else {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
    } catch (err) {
      console.error('이미지 생성 실패:', err);
      alert('이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
      setIsShareModalOpen(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/share/${resultCode}`;
      await navigator.clipboard.writeText(url);
      alert(lang === 'en' ? 'Link Copied!' : '링크가 복사되었습니다!');
      setIsShareModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('링크 복사에 실패했습니다.');
    }
  };

  // [인스타그램 공유 함수]
  const handleInstagramShare = async () => {
    const targetElement = document.getElementById('printable-receipt-area');
    if (!targetElement || isSaving) return;
    setIsSaving(true);
    
    try {
      const url = `${window.location.origin}/share/${resultCode}`;
      await navigator.clipboard.writeText(url).catch(() => {}); 

      const canvas = await html2canvas(targetElement, { 
        backgroundColor: '#f8f8f4', // 영수증 배경색
        scale: 2, 
        useCORS: true, 
        logging: false,
        onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById('printable-receipt-area');
            if (clonedElement) {
                clonedElement.style.borderRadius = '16px 16px 0 0';
                clonedElement.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }
        }
      });
      
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Blob 생성 실패');

      const fileName = `MusicTasty_${finalResultData.name.replace(/\s+/g, '_')}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Music Tasty Result',
          text: '나의 음악 취향 결과! (링크가 복사되었습니다)', 
        });
      } else {
        const imageUrl = canvas.toDataURL('image/png');
        setSavedImageUrl(imageUrl);
        alert(lang === 'en' 
          ? 'Link copied! Save image and share on Instagram.' 
          : '링크가 복사되었습니다!\n이미지를 저장 후 인스타그램 스토리에 올려주세요.');
      }
    } catch (err) {
      console.error('공유 실패:', err);
      handleDownloadImage(); 
      alert(lang === 'en'
        ? 'Sharing not supported. Image saved.'
        : '공유하기가 지원되지 않아 이미지를 저장합니다.');
    } finally {
      setIsSaving(false);
      setIsShareModalOpen(false);
    }
  };

  // 구분선 컴포넌트 (마진 조정)
  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 mb-6 mt-2">
      <div className="flex-1 h-px border-t border-dashed border-[#d1d5db]"></div>
      <span className="shrink-0 text-xs font-black text-[#9ca3af] uppercase tracking-widest">{title}</span>
      <div className="flex-1 h-px border-t border-dashed border-[#d1d5db]"></div>
    </div>
  );

  const progress = (step / currentQuestions.length) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 font-sans text-white select-none relative">
      
      {/* 언어 변경 버튼 (생략) */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setLang(prev => prev === 'en' ? 'ko' : 'en')}
          className="bg-gray-800/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold border border-gray-600 hover:bg-gray-700 transition flex gap-2"
        >
          <span className={lang === 'ko' ? 'text-white' : 'text-gray-500'}>KO</span><span className="text-gray-600">|</span><span className={lang === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
        </button>
      </div>

      {/* 인트로 및 질문 단계 (생략 - 기존과 동일) */}
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
        <div className="w-full max-w-md animate-slide-up pb-10">
          
          {/* 영수증 컨테이너 (그림자 및 배경색 적용) */}
          <div ref={ticketRef} className="relative font-mono pb-8 rounded-t-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-[#f8f8f4] text-[#1f2937]">
            
            {/* ★ 캡처 대상 영역 ★ */}
            <div id="printable-receipt-area" className="p-8 rounded-t-2xl bg-[#f8f8f4]">
                {/* 영수증 헤더 */}
                <div className="text-center border-b-2 border-dashed border-[#d1d5db] pb-6 mb-8">
                    <h2 className="text-3xl font-black tracking-tight uppercase">{t.ticketTitle}</h2>
                    <p className="text-sm text-[#6b7280] mt-2">{new Date().toLocaleDateString()}</p>
                </div>

                {/* 결과 메인 */}
                <div className="text-center mb-10">
                    <div className="text-7xl mb-4">{emoji}</div>
                    <h3 className="text-2xl font-black uppercase leading-tight mb-3">{finalResultData.name}</h3>
                    <p className="text-sm text-[#4b5563] font-sans leading-relaxed px-2 break-keep">{finalResultData.description}</p>
                </div>

                {/* 분석 그래프 (겹침 해결 및 간격 조정) */}
                <div className="mb-10">
                    <SectionDivider title={t.analysis} />
                    <div className="space-y-4"> {/* 항목 간격 늘림 */}
                        {t.metrics.map((metric, idx) => {
                        const values = METRIC_VALUES[idx];
                        const isLeftSelected = answers[idx] === values.leftVal;
                        return (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-dotted border-[#e5e7eb] last:border-0">
                                <span className="font-bold text-[#374151] uppercase tracking-wider w-24 shrink-0 whitespace-nowrap text-left text-xs">{idx + 1}. {metric.label}</span>
                                <div className="w-full grid grid-cols-2 gap-6 ml-4"> {/* 그리드 간격 늘림 */}
                                    <div className={`flex items-center gap-3 ${isLeftSelected ? 'text-black font-bold' : 'text-[#9ca3af]'}`}>
                                        <span className="text-sm w-4 text-center shrink-0">{isLeftSelected ? '☑' : '☐'}</span>
                                        <span className="truncate text-sm">{metric.left}</span>
                                    </div>
                                    <div className={`flex items-center gap-3 ${!isLeftSelected ? 'text-black font-bold' : 'text-[#9ca3af]'}`}>
                                        <span className="text-sm w-4 text-center shrink-0">{!isLeftSelected ? '☑' : '☐'}</span>
                                        <span className="truncate text-sm">{metric.right}</span>
                                    </div>
                                </div>
                            </div>
                        );
                        })}
                    </div>
                </div>

                {/* 테이스팅 노트 */}
                <div className="mb-8">
                    <SectionDivider title={t.tastingNotes} />
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                        {finalResultData.tags.slice(0, 3).map((tag) => ( 
                        <span key={tag} className="px-3 py-1 rounded-full border bg-[#faf5ff] border-[#e9d5ff] text-[#7e22ce] text-xs font-bold uppercase tracking-wide">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            {/* 캡처 대상 영역 끝 */}

            {/* 캡처 제외 영역 */}
            <div className="px-8">
                <div className="mb-2">
                    <SectionDivider title={t.headChefs} />
                    <div className="flex justify-center gap-6 pt-2">
                        {chefs && chefs.map((chef, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 w-24">
                            <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl shadow-sm border border-gray-200 text-gray-700">👨‍🍳</div>
                            <span className={`absolute -bottom-1 -right-1 text-[8px] font-bold px-1.5 py-0.5 rounded text-white border border-white ${chef.region === 'KR' ? 'bg-black' : 'bg-gray-500'}`}>{chef.region}</span>
                            </div>
                            <span className="text-xs font-bold text-gray-800 text-center leading-tight break-words w-full">{chef.name}</span>
                        </div>
                        ))}
                    </div>
                </div>
                
                {/* Footer */}
                <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 flex items-center justify-center gap-4 opacity-80">
                    <div className="w-7 h-7 flex items-center justify-center"> 
                        <img src="/logo_symbol.png" alt="Symbol" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-24 h-6 flex items-center justify-center"> 
                        <img src="/logo_text.png" alt="Logo Type" className="w-full h-full object-contain" />
                    </div>
                </div>
            </div>
            
             {/* 영수증 하단 찢어진 효과 (배경색 변경) */}
             <div className="absolute bottom-[-12px] left-0 w-full h-[12px] bg-[#f8f8f4]" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
          </div>

          {/* 하단 버튼 그룹 */}
          <div className="mt-8 flex flex-col gap-3 px-2">
            <button 
                onClick={() => router.push('/radio')} 
                className="w-full py-4 bg-neon-gradient text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-900/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
                <span className="text-2xl">🎧</span> {t.playBtn}
            </button>

            <div className="grid grid-cols-3 gap-3">
                <button onClick={() => window.location.href = '/'} className="py-3.5 bg-[#1A1A1A] border border-gray-700 text-gray-300 rounded-xl font-bold hover:bg-[#252525] hover:text-white transition text-sm flex flex-col items-center justify-center gap-1.5">
                    <span className="text-xl">🏠</span> {t.homeBtn}
                </button>
                <button onClick={handleDownloadImage} disabled={isSaving} className="py-3.5 bg-gray-800 border border-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition text-sm flex flex-col items-center justify-center gap-1.5">
                    <span className="text-xl">{isSaving ? '⏳' : '💾'}</span> {isSaving ? '저장중...' : t.saveBtn}
                </button>
                <button onClick={() => setIsShareModalOpen(true)} className="py-3.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-100 transition flex flex-col items-center justify-center gap-1.5">
                    <span className="text-xl">🔗</span> {t.shareBtn}
                </button>
            </div>
          </div>
        </div>
      )}

      {/* 공유 모달 (생략 - 기존과 동일) */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsShareModalOpen(false)}>
          <div className="w-full max-w-sm bg-white rounded-t-2xl p-6 pb-10 space-y-6 transform transition-transform duration-300 ease-out" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h3 className="text-black font-bold text-lg">친구에게 공유하기</h3>
              <button onClick={() => setIsShareModalOpen(false)} className="text-gray-400 hover:text-black p-1">✕</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 px-4">
              <button onClick={handleCopyLink} className="flex flex-col items-center gap-3 group p-2 rounded-xl hover:bg-gray-50 transition">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🔗</span>
                </div>
                <span className="text-xs text-gray-600 font-bold">링크 복사</span>
              </button>

              <button onClick={handleInstagramShare} disabled={isSaving} className="flex flex-col items-center gap-3 group p-2 rounded-xl hover:bg-gray-50 transition">
                <div className="w-14 h-14 relative flex items-center justify-center group-hover:scale-110 transition-transform">
                    {isSaving ? (
                        <span className="text-2xl">⏳</span>
                    ) : (
                        <Image 
                            src="/Instagram_logo.png" 
                            alt="Instagram" 
                            fill 
                            className="object-contain" 
                            unoptimized 
                        />
                    )}
                </div>
                <span className="text-xs text-gray-600 font-bold">인스타 스토리</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 이미지 저장용 팝업 모달 (생략 - 기존과 동일) */}
      {savedImageUrl && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setSavedImageUrl(null)}>
          <div className="max-w-sm w-full bg-white rounded-xl p-6 flex flex-col items-center space-y-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-xl text-black">이미지 저장</h3>
            <p className="text-sm text-gray-500 text-center leading-relaxed">
              아래 이미지를 <span className="font-bold text-purple-600">길게 눌러서</span><br/>
              &apos;사진 앱에 저장&apos;을 선택하거나<br/>스크린샷을 찍어주세요.
            </p>
            <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden">
              <img 
                src={savedImageUrl} 
                alt="Saved Result" 
                className="w-full h-auto object-contain"
              />
            </div>
            <button 
              onClick={() => setSavedImageUrl(null)}
              className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition"
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