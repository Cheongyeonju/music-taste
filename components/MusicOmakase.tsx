'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, RECIPES, DishCode } from '@/constants/dishData';

const MusicOmakase = () => {
  const router = useRouter();
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<DishCode[]>([]);
  const [finalResult, setFinalResult] = useState(RECIPES['default']); // 결과 저장용 상태

  // 답변 선택 핸들러
  const handleSelect = (value: DishCode) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    // 로그 출력 (F12 개발자 도구 콘솔에서 확인 가능)
    console.log(`Step ${step} Selected:`, value);
    console.log('Current Answers:', newAnswers);

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(99); 
    }
  };

  // 뒤로가기 핸들러
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

  // [핵심 수정] Step이 99가 되거나 답변이 바뀔 때마다 결과를 계산하여 저장
  useEffect(() => {
    if (step === 99) {
      const code = answers.join('');
      console.log('Generated Code:', code); // 완성된 코드 확인 (예: SCOF)
      
      const foundRecipe = RECIPES[code];
      
      if (foundRecipe) {
        console.log('Recipe Found:', foundRecipe.name);
        setFinalResult(foundRecipe);
      } else {
        console.warn('No Recipe Found for code:', code, '-> Using Default');
        setFinalResult(RECIPES['default']);
      }
    }
  }, [step, answers]);

  // 진행률 계산
  const progress = (step / QUESTIONS.length) * 100;

  // 공유하기 기능
  const handleShare = async () => {
    try {
      const shareData = {
        title: 'SOUND RECIPE',
        text: `Check out my music taste: ${finalResult.name} ${finalResult.emoji}`,
        url: window.location.href,
      };
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! 📋');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 font-sans text-white select-none">
      
      {/* Intro */}
      {step === 0 && (
        <div className="text-center space-y-6 animate-fade-in max-w-2xl relative">
          <div className="inline-block p-4 rounded-full bg-gray-800 border border-gray-700 mb-4 shadow-xl">
             <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">🧾</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">
            Sound <span className="text-neon-gradient">Recipe</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Create your custom music recipe.<br/>
            Select ingredients to find your perfect playlist.
          </p>
          <button 
            onClick={() => setStep(1)}
            className="mt-4 px-10 py-4 bg-neon-gradient text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
          >
            Make My Recipe
          </button>
        </div>
      )}

      {/* Questions */}
      {step >= 1 && step <= 4 && (
        <div className="w-full max-w-lg space-y-4 animate-slide-up relative">
          <div className="flex items-center justify-between mb-2">
            <button onClick={handleBack} className="text-gray-500 hover:text-white text-sm font-bold flex items-center gap-1 transition">
              ← Back
            </button>
            <span className="text-xs font-bold text-purple-400 bg-purple-900/20 px-3 py-1 rounded-full border border-purple-500/30">
              STEP 0{step}
            </span>
          </div>

          <div className="h-1.5 w-full bg-gray-800 rounded-full mb-8 overflow-hidden">
             <div className="h-full bg-neon-gradient transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="bg-[#121212] border border-gray-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
             <h2 className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-2">
               {QUESTIONS[step-1].category}
             </h2>
             <h3 className="text-2xl font-bold mb-6 leading-snug">
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
                    <span className="text-lg font-bold group-hover:text-purple-300">{opt.text}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{opt.subtext}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result (Order Ticket) */}
      {step === 99 && (
        <div className="w-full max-w-sm animate-slide-up pb-10">
          <div className="bg-white text-black p-6 rounded-t-xl shadow-2xl relative font-mono">
            <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Order Ticket</h2>
              <p className="text-xs text-gray-500 mt-1">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-2 mb-6 text-xs text-gray-600 border-b-2 border-dashed border-gray-300 pb-4">
               {/* 선택한 옵션 확인용 */}
               <div className="flex justify-between"><span>BASE</span> <span>{answers[0]}</span></div>
               <div className="flex justify-between"><span>INTENSITY</span> <span>{answers[1]}</span></div>
               <div className="flex justify-between"><span>TEXTURE</span> <span>{answers[2]}</span></div>
               <div className="flex justify-between"><span>GARNISH</span> <span>{answers[3]}</span></div>
            </div>

            <div className="text-center mb-6">
              <div className="text-6xl mb-3 animate-bounce">{finalResult.emoji}</div>
              <h3 className="text-xl font-black uppercase leading-tight mb-2">{finalResult.name}</h3>
              <p className="text-sm text-gray-600 font-sans leading-relaxed">{finalResult.description}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
               {finalResult.tags.map(tag => (
                 <span key={tag} className="bg-black text-white text-[10px] px-2 py-1 rounded-sm uppercase font-bold">#{tag}</span>
               ))}
            </div>
            
            <div className="mt-4 pt-2 flex justify-center opacity-70">
              <div className="h-8 w-48 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover"></div>
            </div>
             <div className="absolute bottom-[-10px] left-0 w-full h-[10px] bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
          </div>

          <div className="mt-8 space-y-3 px-2">
            <button onClick={handleShare} className="w-full py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition flex items-center justify-center gap-2">
              <span>🔗</span> Share Result
            </button>
            <button onClick={() => router.push('/radio')} className="w-full py-4 bg-neon-gradient text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-900/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              <span>🎧</span> Play My Recipe
            </button>
            <button onClick={() => window.location.reload()} className="w-full py-4 bg-[#1A1A1A] border border-gray-700 text-gray-300 rounded-xl font-bold hover:bg-[#252525] hover:text-white transition flex items-center justify-center gap-2">
              <span>🏠</span> Restart Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicOmakase;