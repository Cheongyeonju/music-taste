'use client';

import React, { useState, useEffect, useRef } from 'react'; // [수정] useRef 추가
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import html2canvas from 'html2canvas'; // [수정] html2canvas import
import { RECIPES, DishCode, ChefInfo } from '@/constants/dishData';

// 1. 결과 한글 데이터 (요리 컨셉으로 통일)
const RECIPES_KO: Record<string, { name: string; description: string; tags: string[] }> = {
  // [S] Melody Focus (선율 중심)
  // C: Mild (순한맛)
  'SCOF': { 
    name: '달콤한 어쿠스틱 수플레', 
    description: '입안에서 사르르 녹는 멜로디. 호불호 없이 누구나 편안하게 즐길 수 있는 부드러운 디저트 같은 코스입니다.', 
    tags: ['달콤함', '어쿠스틱', '이지리스닝'] 
  },
  'SCOH': { 
    name: '숨겨진 숲속의 허브티', 
    description: '나만 알고 싶은 맑은 향기. 자극적이지 않고 자연 그대로의 소리를 담은 힐링 티 타임입니다.', 
    tags: ['유기농', '인디포크', '힐링'] 
  },
  'SCPF': { 
    name: '도심의 밤 칵테일', 
    description: '세련된 도시의 야경을 닮은 맛. 적당히 트렌디하고 몽환적인 분위기에 취해보세요.', 
    tags: ['시티팝', 'R&B', '세련된'] 
  },
  'SCPH': { 
    name: '몽환적인 구름 무스', 
    description: '새벽 감성을 자극하는 폭신한 질감. 현실을 잠시 잊게 만드는 꿈결 같은 맛입니다.', 
    tags: ['Lo-Fi', '몽환', '힙스터'] 
  },
  
  // D: Spicy (매운맛/강렬함)
  'SDOF': { 
    name: '청량한 스파클링 에이드', 
    description: '가슴이 뻥 뚫리는 시원한 탄산! 답답한 속을 시원하게 날려버릴 밴드 사운드를 처방합니다.', 
    tags: ['청량', '록', '드라이브'] 
  },
  'SDOH': { 
    name: '거친 야생의 바베큐', 
    description: '다듬어지지 않은 불맛 그대로. 정형화된 레시피를 거부하는 당신을 위한 와일드한 요리입니다.', 
    tags: ['얼터너티브', '개러지', '유니크'] 
  },
  'SDPF': { 
    name: '톡 쏘는 팝핑 캔디', 
    description: '입안에서 터지는 강렬한 비트와 중독성! 가만히 있을 수 없게 만드는 에너지가 넘칩니다.', 
    tags: ['댄스', 'K-POP', '에너지'] 
  },
  'SDPH': { 
    name: '자극적인 퓨전 마라맛', 
    description: '예측할 수 없는 독특한 향신료의 조화. 평범함을 거부하는 당신을 위한 실험적인 별미입니다.', 
    tags: ['글리치', '전자음악', '실험적'] 
  },

  // [B] Story/Lyrics Focus (서사/가사 중심)
  // C: Mild (순한맛)
  'BCOF': { 
    name: '따뜻한 집밥 정식', 
    description: '오래된 일기장을 꺼내 보듯 익숙하고 포근한 맛. 가사 하나하나가 마음에 와닿아 위로를 건넵니다.', 
    tags: ['발라드', '위로', '공감'] 
  },
  'BCOH': { 
    name: '담백한 호밀빵 브런치', 
    description: '화려한 소스 없이 재료 본연의 깊은 맛. 담담하게 읊조리는 가사가 긴 여운을 남깁니다.', 
    tags: ['인디', '서정적', '새벽'] 
  },
  'BCPF': { 
    name: '진한 다크 초콜릿', 
    description: '쌉싸름하지만 깊은 풍미가 있는 R&B. 분위기 잡고 싶은 날 꺼내 먹기 좋은 고급스러운 맛입니다.', 
    tags: ['R&B', '그루브', '딥'] 
  },
  'BCPH': { 
    name: '보랏빛 새벽 와인', 
    description: '복잡한 마음을 달래주는 깊은 향기. 우울하지만 아름다운 감성에 젖어들기 좋은 한 잔입니다.', 
    tags: ['새벽감성', '얼터너티브', '무드'] 
  },

  // D: Spicy (매운맛/강렬함)
  'BDOF': { 
    name: '웅장한 스테이크 플래터', 
    description: '모두가 하나 되어 즐기는 메인 디시. 드라마틱한 전개와 벅찬 서사가 배부른 만족감을 줍니다.', 
    tags: ['앤썸', '드라마틱', '록'] 
  },
  'BDOH': { 
    name: '얼큰한 해장국', 
    description: '속 시원하게 할 말은 하는 사이다 같은 맛. 거침없는 가사가 답답한 체증을 내려줍니다.', 
    tags: ['힙합', '메시지', '강렬'] 
  },
  'BDPF': { 
    name: '미슐랭 시그니처 코스', 
    description: '서사와 대중성, 맛의 밸런스가 완벽한 요리. 누구나 인정할 수밖에 없는 웰메이드 명곡입니다.', 
    tags: ['명곡', '트렌드', '올라운더'] 
  },
  'BDPH': { 
    name: '심오한 예술가 디저트', 
    description: '음악을 넘어 하나의 예술 작품 같은 맛. 아티스트의 철학을 음미하는 미식가를 위한 접시입니다.', 
    tags: ['예술', '컨셉추얼', '철학'] 
  },
  
  'default': { name: '오늘의 쉐프 추천', description: '분석할 수 없는 신비로운 취향이네요! 쉐프가 엄선한 랜덤 코스를 제공합니다.', tags: ['미스테리'] }
};

// 2. 영어 질문 데이터
const QUESTIONS_EN = [
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

// 3. 한국어 질문 데이터
const QUESTIONS_KO = [
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
      { text: '자연산 (Raw)', subtext: '꾸밈없는 목소리와 통기타', value: 'O', icon: '🪵' },
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

// 4. UI 텍스트 (문구 수정 반영)
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
    // 타이틀 및 설명 문구 변경
    introTitle: <>당신의 음악은 <br/><span className="text-neon-gradient">무슨 맛인가요?</span></>,
    introDesc: <>선호하는 음악 타입을 선택 해 주세요.<br/>나만의 음악 레시피를 찾아드립니다.</>,
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
      { label: '질감', left: '자연산', right: '가공' },
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

  // [수정] 영수증 영역을 캡처하기 위한 ref 생성
  const ticketRef = useRef<HTMLDivElement>(null);

  const t = UI_TEXT[lang];
  const currentQuestions = lang === 'ko' ? QUESTIONS_KO : QUESTIONS_EN;

  // ... (handleSelect, handleBack, getRandomChefs, useEffect, getResultText 로직 그대로) ...
  const handleSelect = (value: DishCode) => { /* 기존 코드 유지 */
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < currentQuestions.length) { 
      setStep(step + 1);
    } else {
      setStep(99); 
    }
  };

  const handleBack = () => { /* 기존 코드 유지 */
    if (step === 0) return;
    if (step === 99) {
      setStep(currentQuestions.length);
      setAnswers(prev => prev.slice(0, -1));
      return;
    }
    setStep(prev => prev - 1);
    setAnswers(prev => prev.slice(0, -1));
  };

  const getRandomChefs = (allChefs: ChefInfo[]) => { /* 기존 코드 유지 */
    return [...allChefs].sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  useEffect(() => { /* 기존 코드 유지 */
    if (step === 99) {
      const code = answers.join('');
      const foundRecipe = RECIPES[code] || RECIPES['default'];
      const randomChefs = getRandomChefs(foundRecipe.chefs);
      
      setResultCode(code); 
      setChefs(randomChefs); 
      setEmoji(foundRecipe.emoji); 
    }
  }, [step, answers]);

  const getResultText = () => { /* 기존 코드 유지 */
    if (lang === 'ko') {
      return RECIPES_KO[resultCode] || RECIPES_KO['default'];
    }
    return RECIPES[resultCode] || RECIPES['default'];
  };
  
  const finalResultData = getResultText();

  // [수정] 이미지 캡처 및 공유 기능으로 변경된 함수
  const handleShare = async () => {
    if (!ticketRef.current) return;

    try {
      // 1. 영수증 영역(ticketRef)을 캔버스로 변환 (이미지 캡처)
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: '#ffffff', // 배경 흰색 고정
        scale: 2, // 고화질 캡처
      });

      // 2. 캔버스를 Blob(이미지 데이터)으로 변환
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        // 3. 이미지 파일 객체 생성
        const file = new File([blob], 'music_taste_receipt.png', { type: 'image/png' });

        // 4. 공유 데이터 설정
        const shareData = {
          title: lang === 'en' ? "What's Your Music Tasty?" : "당신의 음악은 무슨 맛인가요?",
          text: `My Music Taste is: ${finalResultData.name} ${emoji}`,
          files: [file], // 파일 첨부
        };

        // 5. 네이티브 공유하기 (모바일 등)
        if (navigator.share && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          // PC 등 파일 공유가 안 되는 환경에서는 기존처럼 링크 복사
          await navigator.clipboard.writeText(window.location.href);
          alert(lang === 'en' ? 'Link copied! (Image sharing not supported on this device)' : '링크가 복사되었습니다! (이 기기에서는 이미지 공유를 지원하지 않습니다)');
        }
      }, 'image/png');

    } catch (err) {
      console.error('Error sharing:', err);
      // 에러 시 링크 복사로 대체
      await navigator.clipboard.writeText(window.location.href);
      alert(lang === 'en' ? 'Link copied!' : '링크가 복사되었습니다!');
    }
  };

  const SectionDivider = ({ title }: { title: string }) => ( /* 기존 코드 유지 */
    <div className="flex items-center gap-2 mb-3 mt-1">
      <div className="flex-1 h-px border-t border-dashed border-gray-300"></div>
      <span className="shrink-0 text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {title}
      </span>
      <div className="flex-1 h-px border-t border-dashed border-gray-300"></div>
    </div>
  );

  const progress = (step / currentQuestions.length) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 font-sans text-white select-none relative">
      
      {/* ... (Language Toggle, Intro, Questions 부분은 기존 코드 그대로 유지) ... */}
      
      {/* Language Toggle */}
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

      {step === 0 && (
        <div className="text-center space-y-6 animate-fade-in max-w-2xl relative">
            {/* ... Intro 내용 ... */}
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

      {step >= 1 && step <= 4 && (
        <div className="w-full max-w-lg space-y-4 animate-slide-up relative">
            {/* ... Questions 내용 ... */}
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
               {currentQuestions[step-1].category}
             </h2>
             <h3 className="text-2xl font-bold mb-6 leading-snug break-keep">
               {currentQuestions[step-1].query}
             </h3>

             <div className="grid gap-3">
              {currentQuestions[step-1].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.value as DishCode)}
                  className="group p-5 bg-[#1A1A1A] border border-gray-700 rounded-xl text-left hover:border-purple-500 hover:bg-[#202020] transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold group-hover:text-purple-300 break-keep">
                        {(opt as any).icon && <span className="mr-2">{(opt as any).icon}</span>}
                        {opt.text}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1 break-keep">{opt.subtext}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result (Order Ticket) */}
      {step === 99 && (
        <div className="w-full max-w-sm animate-slide-up pb-10">
          
          {/* [수정] ref={ticketRef}를 추가하여 캡처 영역 지정 */}
          <div ref={ticketRef} className="bg-white text-black p-5 rounded-t-xl shadow-2xl relative font-mono pb-8">
            
            {/* Header */}
            <div className="text-center border-b-2 border-dashed border-gray-300 pb-3 mb-4">
              <h2 className="text-xl font-black tracking-tighter uppercase">{t.ticketTitle}</h2>
              <p className="text-[10px] text-gray-600 mt-0.5">{new Date().toLocaleDateString()}</p>
            </div>

            {/* Main Result */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">{emoji}</div>
              <h3 className="text-lg font-black uppercase leading-tight mb-1">{finalResultData.name}</h3>
              <p className="text-[10px] text-gray-700 font-sans leading-relaxed px-1 break-keep">
                {finalResultData.description}
              </p>
            </div>

            {/* Analysis Section */}
            <div className="mb-6">
              <SectionDivider title={t.analysis} />
              <div className="space-y-2">
                {t.metrics.map((metric, idx) => {
                  const values = METRIC_VALUES[idx];
                  const isLeftSelected = answers[idx] === values.leftVal;
                  return (
                    <div key={idx} className="flex items-center justify-between text-[9px] h-5 border-b border-dotted border-gray-200 last:border-0">
                      <span className="font-bold text-gray-600 uppercase tracking-wider w-20 shrink-0 whitespace-nowrap text-left">
                        {idx + 1}. {metric.label}
                      </span>
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

            {/* Tags Section */}
            <div className="mb-6">
              <SectionDivider title={t.tastingNotes} />
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {finalResultData.tags.slice(0, 3).map((tag) => ( 
                  <span key={tag} className="px-2 py-0.5 rounded border bg-purple-50 border-purple-200 text-purple-700 text-[10px] font-bold uppercase tracking-wide">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Chefs Section */}
            <div className="mb-0.5">
               <SectionDivider title={t.headChefs} />
              <div className="flex justify-center gap-4 pt-1">
                {chefs && chefs.map((chef, idx) => (
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
            <div className="mt-4 pt-2 flex justify-center opacity-60">
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
            
             <div className="absolute bottom-[-10px] left-0 w-full h-[10px] bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
          </div>

          {/* Buttons (캡처 영역 밖) */}
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