'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation'; 
import Image from 'next/image';
import { RECIPES, RECIPES_KO, DishCode, ChefInfo } from '@/constants/dishData';
import { TAG_RECIPES } from '@/constants/playlistData';

// ✅ [추가] Supabase 및 아이콘
import { createClient } from '@supabase/supabase-js';
import { Share2,Sparkles, Play, Pause, SkipForward, Loader2, Volume2, Music as MusicIcon } from 'lucide-react';

// ✅ [추가] Supabase Client 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// [16가지 코드 전체 리스트]
const ALL_CODES = [
  "SCOF", "SCOH", "SCPF", "SCPH", "SDOF", "SDOH", "SDPF", "SDPH",
  "BCOF", "BCOH", "BCPF", "BCPH", "BDOF", "BDOH", "BDPF", "BDPH"
];

// 트랙 타입 정의
interface Track {
  id: number;
  title: string;
  artist_name: string;
  audio_url: string;
  cover_image_url: string | null;
}

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
    introTitle: <>What&apos;s Your <br/><span className="text-neon-gradient">Music Taste?</span></>,
    introDesc: <>What flavor is your music?<br/>Analyze your taste and create a playlist.</>,
    startBtn: "Start Analysis",
    step: "STEP",
    back: "← Back",
    ticketTitle: "Music Taste Result",
    analysis: "Taste Graph",
    tastingNotes: "Flavor Notes",
    headChefs: "Similar Artists",
    playBtn: "More songs with my taste",
    homeBtn: "Home",
    shareBtn: "Share Result",
    retakeBtn: "Retake", 
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
    ticketTitle: "MUSIC TASTE",
    analysis: "취향 분석표",
    tastingNotes: "테이스팅 노트",
    headChefs: "추천 아티스트",
    playBtn: "내 취향 다른 노래 더 듣기",
    homeBtn: "처음으로",
    shareBtn: "결과 공유하기",
    retakeBtn: "다시하기",
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

const SectionDivider = ({ title }: { title: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '8px' }}>
    <div style={{ flex: 1, height: '1px', borderTop: '1px dashed #d1d5db' }}></div>
    <span style={{ flexShrink: 0, fontSize: '10px', fontWeight: 900, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '-2px', paddingLeft: '12px', paddingRight: '12px' }}>{title}</span>
    <div style={{ flex: 1, height: '1px', borderTop: '1px dashed #d1d5db' }}></div>
  </div>
);

const getConsistentChefs = (code: string, originChefs: ChefInfo[], variantId: number) => {
    let seed = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + (variantId * 1337);
    const shuffled = [...originChefs].sort(() => {
        const x = Math.sin(seed++) * 10000;
        return (x - Math.floor(x)) - 0.5;
    });
    return shuffled.slice(0, 3);
};

const ReceiptView = ({ code, lang, t }: { code: string, lang: 'en' | 'ko', t: any }) => {
  const [variantId] = useState(() => Math.floor(Math.random() * 3));
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toLocaleDateString('ko-KR'));
  }, []);

  const baseData = RECIPES[code] || RECIPES['default'];
  const textData = lang === 'ko' ? (RECIPES_KO[code] || RECIPES_KO['default']) : baseData;
  const emoji = baseData.emoji;
  const chefs = getConsistentChefs(code, baseData.chefs, variantId);
  const localAnswers = code.split('') as DishCode[]; 

  return (
    <div 
        className="relative rounded-t-2xl font-sans mb-8"
        style={{ 
            backgroundColor: '#f8f8f4', 
            color: '#1f2937', 
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))', 
            width: '100%',
            maxWidth: '380px'
        }}
    >
        <div style={{ padding: '24px', paddingBottom: '0' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px dashed #d1d5db', paddingBottom: '20px', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.025em', textTransform: 'uppercase', margin: 0, color: '#1f2937' }}>{t.ticketTitle}</h2>
                <p style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px', margin: 0 }}>
                    {today}
                </p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ fontSize: '72px', marginBottom: '16px', lineHeight: 1 }}>{emoji}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '8px', marginTop: 0, color: '#1f2937' }}>{textData.name}</h3>
                <p style={{ fontSize: '11px', color: '#4b5563', fontFamily: 'sans-serif', lineHeight: 1.6, padding: '0 4px', margin: 0, wordBreak: 'keep-all' }}>{textData.description}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <SectionDivider title={t.analysis} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {t.metrics.map((metric: any, idx: number) => {
                        const values = METRIC_VALUES[idx];
                        const isLeftSelected = localAnswers[idx] === values.leftVal;
                        return (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '6px 0', borderBottom: '1px dotted #e5e7eb' }}>
                                <span style={{ width: '80px', flexShrink: 0, fontWeight: 'bold', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', textAlign: 'left' }}>{idx + 1}. {metric.label}</span>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: '24px' }}>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', color: isLeftSelected ? '#000000' : '#9ca3af', fontWeight: isLeftSelected ? 'bold' : 'normal' }}>
                                        <span style={{ fontSize: '12px', marginRight: '6px', lineHeight: 1 }}>{isLeftSelected ? '☑' : '☐'}</span>
                                        <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>{metric.left}</span>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', color: !isLeftSelected ? '#000000' : '#9ca3af', fontWeight: !isLeftSelected ? 'bold' : 'normal' }}>
                                        <span style={{ fontSize: '12px', marginRight: '6px', lineHeight: 1 }}>{!isLeftSelected ? '☑' : '☐'}</span>
                                        <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>{metric.right}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <SectionDivider title={t.tastingNotes} />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', paddingTop: '4px' }}>
                    {textData.tags.slice(0, 3).map((tag: string) => ( 
                    <span key={tag} style={{ 
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '24px', 
                        padding: '0 12px', borderRadius: '4px', border: '1px solid #e9d5ff', 
                        backgroundColor: '#faf5ff', color: '#7e22ce', fontSize: '10px', 
                        fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.025em' 
                    }}>#{tag}</span>
                    ))}
                </div>
            </div>
        
            <div style={{ marginBottom: '24px' }}>
                <SectionDivider title={t.headChefs} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', paddingTop: '5px' }}>
                    {chefs && chefs.map((chef, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '72px' }}>
                        <div style={{ position: 'relative', marginBottom: '8px' }}>
                            <div style={{ 
                                width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f3f4f6', 
                                border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                fontSize: '24px', color: '#374151' 
                            }}>👨‍🍳</div>
                            <div style={{ 
                                position: 'absolute', bottom: '-4px', right: '-4px', width: '24px', height: '14px', 
                                backgroundColor: chef.region === 'KR' ? '#000000' : '#6b7280', 
                                borderRadius: '4px', border: '1px solid #ffffff', display: 'flex', 
                                alignItems: 'center', justifyContent: 'center' 
                            }}>
                                <span style={{ fontSize: '7px', fontWeight: 'bold', color: '#ffffff', lineHeight: 1 }}>{chef.region}</span>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#1f2937', lineHeight: 1.1, wordBreak: 'keep-all' }}>{chef.name}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '2px dashed #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', paddingBottom: '32px', opacity: 0.8 }}>
                <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                    <img src="/logo_symbol.png" alt="Symbol" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ width: '70px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                    <img src="/logo_text.png" alt="Logo Type" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
            </div>
        </div>

        <div style={{ 
            position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '10px', 
            backgroundColor: '#f8f8f4', 
            clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)' 
        }}></div>
    </div>
  );
};


const MusicTaste = () => {
  const router = useRouter();
  const params = useParams(); 
  const shareCode = params?.code ? (params.code as string) : null;

  const [lang, setLang] = useState<'en' | 'ko'>('en'); 
  const [step, setStep] = useState(shareCode ? 99 : 0); 
  const [answers, setAnswers] = useState<DishCode[]>([]);
  const [resultCode, setResultCode] = useState<string>(
    shareCode ? shareCode.toUpperCase() : 'default'
  );

  // 일반 진행 state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
   
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
  const [isKakaoInApp, setIsKakaoInApp] = useState(false);
  const [isFileReady, setIsFileReady] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);

  // ✅ [추가] 뮤직 플레이어 State
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaylistLoading, setIsPlaylistLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = UI_TEXT[lang];
  const currentQuestions = lang === 'ko' ? QUESTIONS_KO : QUESTIONS_EN;

  useEffect(() => {
    if (shareCode) {
      const code = shareCode.toUpperCase();
      const foundRecipe = RECIPES[code] || RECIPES['default'];
      if (foundRecipe) {
          setStep(99); 
          setResultCode(code);
      }
    }
  }, [shareCode]);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('kakao')) {
      if (userAgent.includes('android')) {
        const url = window.location.href.replace(/https?:\/\//i, '');
        const intentUrl = `intent://${url}#Intent;scheme=https;package=com.android.chrome;end`;
        window.location.href = intentUrl;
      } else {
        setIsKakaoInApp(true);
      }
    }
  }, []);

  const getImagePath = (code: string, currentLang: string) => {
    const suffix = currentLang === 'en' ? '(Eng)' : '(Kr)';
    return `/results/${code}${suffix}.png`;
  };

  useEffect(() => {
    if (step === 99 && resultCode && resultCode !== 'default') {
      const prepareImage = async () => {
        setIsFileReady(false); 
        try {
          const imagePath = getImagePath(resultCode, lang);
          const response = await fetch(imagePath);
          if (!response.ok) throw new Error(`Image fetch failed: ${response.status}`);
          
          const blob = await response.blob();
          const fileName = `MusicTaste_${resultCode}.png`;
          const file = new File([blob], fileName, { type: 'image/png' });
          setResultFile(file);

          const blobUrl = URL.createObjectURL(blob);
          setResultBlobUrl(blobUrl);
          setIsFileReady(true);
        } catch (e) {
          console.error("[Prepare Image Failed]", e);
          setIsFileReady(false);
        }
      };
      prepareImage();
    }

    return () => {
      if (resultBlobUrl) URL.revokeObjectURL(resultBlobUrl);
    };
  }, [step, resultCode, lang]);

  // ✅ [추가] 플레이리스트 Fetch Logic (결과 화면 진입 시)
  useEffect(() => {
    const fetchMusic = async () => {
      if (step === 99 && resultCode) {
        setIsPlaylistLoading(true);
        const code = resultCode || 'default';
        const recipe = TAG_RECIPES[code]; 

        if (recipe) {
          try {
            const { data, error } = await supabase.rpc('get_event_playlist', {
              p_genre: recipe.genre,
              p_mood: recipe.mood,
              p_tags: recipe.tags,
              p_limit: 10
            });

            if (error) {
                 console.error("RPC Error:", error);
                 throw error;
            }

            if (data && data.length > 0) {
              setPlaylist(data);
              setCurrentTrackIndex(0);
              setIsPlaying(true); // 자동 재생
            }
          } catch (e) {
            console.error("Failed to fetch playlist:", e);
          }
        }
        setIsPlaylistLoading(false);
      }
    };
    fetchMusic();
  }, [step, resultCode]);

  // ✅ [추가] 오디오 제어 Logic
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Autoplay blocked:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const playNext = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
      setIsPlaying(true);
    } else {
      setCurrentTrackIndex(0);
      setIsPlaying(true);
    }
  };

  const handleSelect = (idx: number, value: DishCode) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setTimeout(() => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);
        if (step < 4) setStep(step + 1);
        else setStep(99);
        setSelectedOption(null);
    }, 400); 
  };

  const handleBack = () => {
    if (step === 0) return;
    if (step === 99) {
      setStep(4);
      setAnswers(prev => prev.slice(0, -1));
      return;
    }
    setStep(prev => prev - 1);
    setAnswers(prev => prev.slice(0, -1));
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setResultCode('default');
    setResultFile(null);
    if (resultBlobUrl) URL.revokeObjectURL(resultBlobUrl);
    setResultBlobUrl(null);
    setIsFileReady(false);
    setSelectedOption(null);
    setPlaylist([]); // 초기화
    setIsPlaying(false);
    window.scrollTo(0, 0);
  };

  // 일반 진행 시 결과 처리
  useEffect(() => {
    if (step === 99 && !shareCode) {
      const code = answers.join('');
      setResultCode(code); 
    }
  }, [step, answers, shareCode]);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/share/${resultCode}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        alert(lang === 'en' ? 'Link Copied!' : '링크가 복사되었습니다!');
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert(lang === 'en' ? 'Link Copied!' : '링크가 복사되었습니다!');
      }
      setIsShareModalOpen(false); 
    } catch (err) {
      console.error(err);
      alert('링크 복사에 실패했습니다.');
    }
  };

  const handleInstagramShare = async () => {
    if (!isFileReady || !resultFile) {
        const fallbackPath = getImagePath(resultCode, lang);
        const confirmMsg = lang === 'ko' 
            ? '이미지를 불러오지 못했습니다. 링크를 열어서 확인하시겠습니까?' 
            : 'Failed to load image. Open image link?';
        if(confirm(confirmMsg)) {
            window.open(fallbackPath, '_blank');
        }
        return;
    }

    const shareUrl = window.location.origin; 
    const shareText = lang === 'ko' 
        ? `나의 음악 취향 결과! 🍽️\n테스트 하러 가기 👇\n${shareUrl}`
        : `My Music Taste Result! 🍽️\nTry it now 👇\n${shareUrl}`;

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [resultFile] })) {
        try {
            await navigator.share({
                files: [resultFile],
                title: 'Music Taste Result',
                text: shareText,
                url: shareUrl, 
            });
            setIsShareModalOpen(false);
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                setSavedImageUrl(resultBlobUrl); 
            }
        }
    } else {
        setSavedImageUrl(resultBlobUrl);
        setIsShareModalOpen(false);
    }
  };
  
  const handlePlayList = () => {
    // 3. Unlisted 사이트로 보낼 URL 생성
    const code = resultCode || 'default';
    const recipe = TAG_RECIPES[code] || TAG_RECIPES['default'];
    const baseUrl = 'https://unlisted.music/radio';
    const params = new URLSearchParams({
      start_radio: 'true',           
      genre: recipe.genre,           
      mood: recipe.mood,             
      tags: recipe.tags.join(','),   
      utm_source: 'music_taste_test', 
      utm_content: code              
    });
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
  };

  const progress = (step / 4) * 100;

  // ----------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------

  // 플레이어에서 사용할 현재 트랙
  const currentTrack = playlist[currentTrackIndex];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 font-sans text-white select-none relative">
      
      {/* ✅ [추가] 숨겨진 오디오 태그 */}
      {currentTrack && (
        <audio
            ref={audioRef}
            src={currentTrack.audio_url}
            onEnded={playNext}
            crossOrigin="anonymous"
        />
      )}

      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={() => setLang(prev => prev === 'en' ? 'ko' : 'en')}
          className="bg-gray-800/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold border border-gray-600 hover:bg-gray-700 transition flex gap-2"
        >
          <span className={lang === 'ko' ? 'text-white' : 'text-gray-500'}>KO</span><span className="text-gray-600">|</span><span className={lang === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
        </button>
      </div>

      {isKakaoInApp && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-end p-6 text-white font-bold animate-fade-in" onClick={() => setIsKakaoInApp(false)}>
            <div className="text-3xl animate-bounce mb-2">↗</div>
            <div className="text-right space-y-2">
                <p className="text-xl text-yellow-400">Safari 브라우저로 열어주세요!</p>
            </div>
        </div>
      )}

      {/* 갤러리 모드 (777) */}
      {step === 777 && (
        <div className="w-full max-w-lg space-y-8 animate-fade-in pb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">👀 Gallery Mode (All 16)</h2>
                <button onClick={() => setStep(0)} className="px-3 py-1 bg-gray-800 rounded-lg text-sm">Close</button>
            </div>
            {ALL_CODES.map((code) => (
                <ReceiptView key={code} code={code} lang={lang} t={t} />
            ))}
        </div>
      )}

      {step === 0 && (
        <div className="text-center space-y-6 animate-fade-in max-w-2xl relative">
          <button 
            onClick={() => setStep(777)}
            className="absolute top-0 left-0 p-2 opacity-30 hover:opacity-100 text-2xl"
            title="View All Results"
          >
            🐞
          </button>

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

      {step === 99 && (
        <div className="w-full max-w-sm animate-slide-up pb-10 relative z-10">
          <ReceiptView code={resultCode} lang={lang} t={t} />

          {/* ----------------------------------------------------------- */}
          {/* ✅ [추가됨] INLINE MUSIC PLAYER (버튼 바로 위) */}
          {/* ----------------------------------------------------------- */}
          <div className="px-1 mb-4">
              <div className="relative overflow-hidden rounded-2xl bg-[#252525] border border-gray-700 p-3 shadow-xl flex items-center gap-4">
                {/* Album Art */}
                <div className={`w-12 h-12 rounded-full bg-black flex-shrink-0 overflow-hidden border border-white/10 shadow-lg ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                    {currentTrack?.cover_image_url ? (
                        <img src={currentTrack.cover_image_url} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600"><MusicIcon size={18}/></div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    {isPlaylistLoading ? (
                        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wide">
                            <Loader2 className="animate-spin" size={12}/> Curating...
                        </div>
                    ) : playlist.length > 0 ? (
                        <div className="flex flex-col justify-center">
                            <span className="font-bold text-white text-sm truncate">{currentTrack?.title}</span>
                            <span className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                                {currentTrack?.artist_name || 'Unlisted Artist'}
                                <Volume2 size={10} className="text-purple-400"/>
                            </span>
                        </div>
                    ) : (
                            <span className="text-xs text-gray-500">No matching tracks found.</span>
                    )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={togglePlay}
                        disabled={playlist.length === 0}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPlaying ? <Pause fill="black" size={14} /> : <Play fill="black" size={14} className="ml-0.5"/>}
                    </button>
                    <button 
                            onClick={playNext}
                            disabled={playlist.length === 0}
                            className="w-8 h-8 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center hover:bg-gray-600 hover:text-white transition disabled:opacity-30"
                    >
                        <SkipForward size={14}/>
                    </button>
                </div>
              </div>
          </div>
          {/* ----------------------------------------------------------- */}

          <div className="flex flex-col gap-3 px-1 relative z-20">
            <button 
                onClick={handlePlayList} 
                className="w-full py-4 bg-neon-gradient text-white rounded-xl font-bold text-base shadow-lg shadow-purple-900/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
                <span className="text-xl"><Sparkles /></span> {t.playBtn}
            </button>

            <div className="flex w-full gap-3">
                <button onClick={(e) => { e.stopPropagation(); setIsShareModalOpen(true); }} className="flex-[2] py-3.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-md">
                    <span className="text-xl"><Share2 /></span> {t.shareBtn}
                </button>
                
                <button onClick={handleRestart} className="flex-1 py-3.5 bg-gray-800 text-gray-300 border border-gray-700 rounded-xl font-bold text-sm hover:bg-gray-700 hover:text-white transition flex items-center justify-center gap-2 shadow-md">
                    <span className="text-xl">↻</span>
                    <span>{t.retakeBtn}</span>
                </button>
            </div>
          </div>
        </div>
      )}

      {isShareModalOpen && (
        <div className="fixed inset-0 z-[5000] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsShareModalOpen(false)}>
          <div className="w-full max-w-sm bg-[#252525] rounded-t-2xl overflow-hidden pb-4" onClick={e => e.stopPropagation()}>
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
                
                <button onClick={handleInstagramShare} className="flex items-center gap-3 p-5 hover:bg-gray-700/50 transition text-left active:bg-gray-700">
                    <div className="w-10 h-10 relative flex items-center justify-center">
                        {!isFileReady ? (
                            <span className="text-xl animate-spin">⏳</span>
                        ) : (
                             <Image src="/Instagram_logo.png" alt="Instagram" fill className="object-contain p-1" unoptimized />
                        )}
                    </div>
                    <span className="text-white font-bold text-sm">{t.shareImage}</span>
                </button>
            </div>
          </div>
        </div>
      )}

      {savedImageUrl && (
        <div className="fixed inset-0 z-[5010] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setSavedImageUrl(null)}>
          <div className="max-w-sm w-full bg-white rounded-xl p-6 flex flex-col items-center space-y-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg text-black">이미지 저장</h3>
            <p className="text-sm text-gray-500 text-center leading-relaxed">
              아래 이미지를 <span className="font-bold text-purple-600">길게 눌러서 저장</span> 후<br/>인스타그램에 공유해주세요!
            </p>
            <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
              <img src={savedImageUrl} alt="Saved Result" className="w-full h-auto object-contain" />
            </div>
            <button onClick={() => setSavedImageUrl(null)} className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicTaste;