'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, RECIPES, DishCode } from '@/constants/dishData';

// 분석 항목 정의
const ANALYSIS_METRICS = [
  { label: 'BASE', leftLabel: 'Melody', rightLabel: 'Story', leftVal: 'S', rightVal: 'B' },
  { label: 'INTENSITY', leftLabel: 'Mild', rightLabel: 'Spicy', leftVal: 'C', rightVal: 'D' },
  { label: 'TEXTURE', leftLabel: 'Organic', rightLabel: 'Electric', leftVal: 'O', rightVal: 'P' },
  { label: 'GARNISH', leftLabel: 'Famous', rightLabel: 'Hidden', leftVal: 'F', rightVal: 'H' },
];

const MusicOmakase = () => {
  const router = useRouter();
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<DishCode[]>([]);
  const [finalResult, setFinalResult] = useState(RECIPES['default']);

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

  useEffect(() => {
    if (step === 99) {
      const code = answers.join('');
      const foundRecipe = RECIPES[code];
      if (foundRecipe) {
        setFinalResult(foundRecipe);
      } else {
        setFinalResult(RECIPES['default']);
      }
    }
  }, [step, answers]);

  const progress = (step / QUESTIONS.length) * 100;

  const handleShare = async () => {
    try {
      const shareData = {
        title: "What's Your Music Tasty?",
        text: `My Music Taste is: ${finalResult.name} ${finalResult.emoji}`,
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

  const handleHome = () => {
    window.location.href = '/'; 
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 font-sans text-white select-none">
      
      {/* ================= Intro ================= */}
      {step === 0 && (
        <div className="text-center space-y-6 animate-fade-in max-w-2xl relative">
          <div className="inline-block p-4 rounded-full bg-gray-800 border border-gray-700 mb-4 shadow-xl">
             <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">🧾</span>
          </div>
          {/* [Title Changed] */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
            What&apos;s Your <br/>
            <span className="text-neon-gradient">Music Tasty?</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover your musical flavor.<br/>
            Select ingredients to find your perfect dish.
          </p>
          <button 
            onClick={() => setStep(1)}
            className="mt-4 px-10 py-4 bg-neon-gradient text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
          >
            Start Tasting
          </button>
        </div>
      )}

      {/* ================= Questions ================= */}
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

      {/* ================= Result (White Receipt) ================= */}
      {step === 99 && (
        <div className="w-full max-w-sm animate-slide-up pb-10">
          
          <div className="bg-white text-black p-6 rounded-t-xl shadow-2xl relative font-mono">
            
            {/* Header */}
            <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Order Ticket</h2>
              <p className="text-xs text-gray-500 mt-1">Date: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Emoji & Title (Motion Removed) */}
            <div className="text-center mb-6">
              {/* [Motion Removed] animate-bounce 제거됨 */}
              <div className="text-6xl mb-4">{finalResult.emoji}</div>
              <h3 className="text-xl font-black uppercase leading-tight mb-2">{finalResult.name}</h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed px-2 break-keep">{finalResult.description}</p>
            </div>

            {/* Analysis Gauge Bar */}
            <div className="space-y-3 mb-6 pb-6 border-b-2 border-dashed border-gray-300">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-2">
                Ingredient Analysis
              </p>
              
              {ANALYSIS_METRICS.map((metric, idx) => {
                const isLeftSelected = answers[idx] === metric.leftVal;
                return (
                  <div key={metric.label} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-sans font-bold">
                      <span className={`w-14 text-right transition-colors ${isLeftSelected ? 'text-black' : 'text-gray-300'}`}>
                        {metric.leftLabel}
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden relative border border-gray-200">
                        <div 
                          className={`absolute h-full w-1/2 bg-black transition-all duration-500 ${isLeftSelected ? 'left-0' : 'left-1/2'}`}
                        ></div>
                      </div>
                      <span className={`w-14 text-left transition-colors ${!isLeftSelected ? 'text-black' : 'text-gray-300'}`}>
                        {metric.rightLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tags */}
            <div className="mb-4 text-center">
              <div className="flex flex-wrap justify-center gap-1.5">
                {finalResult.tags.map((tag, idx) => {
                  const isMainTag = idx < 3;
                  const tagStyle = isMainTag 
                    ? "bg-purple-100 border-purple-200 text-purple-700" 
                    : "bg-gray-100 border-gray-200 text-gray-500";
                  return (
                    <span key={tag} className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wide ${tagStyle}`}>
                      #{tag}
                    </span>
                  );
                })}
              </div>
            </div>
            
            {/* Barcode */}
            <div className="mt-4 pt-2 flex justify-center opacity-50">
              <div className="h-6 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover"></div>
            </div>
            
             <div className="absolute bottom-[-10px] left-0 w-full h-[10px] bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-2 px-2">
            <div className="flex gap-2">
              <button 
                onClick={() => router.push('/radio')} 
                className="flex-[2] py-3 bg-neon-gradient text-white rounded-lg font-bold text-sm shadow-lg shadow-purple-900/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <span>🎧</span> Play Recipe
              </button>
              <button 
                onClick={handleHome} 
                className="flex-1 py-3 bg-[#1A1A1A] border border-gray-700 text-gray-300 rounded-lg font-bold hover:bg-[#252525] hover:text-white transition text-sm flex items-center justify-center gap-2"
              >
                <span>🏠</span> Home
              </button>
            </div>
            
            <button 
              onClick={handleShare} 
              className="w-full py-3 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>🔗</span> Share Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicOmakase;