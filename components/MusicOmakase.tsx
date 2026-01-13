'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, RECIPES, DishCode, ChefInfo } from '@/constants/dishData';

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
      
      {/* ================= Intro (Step 0) ================= */}
      {step === 0 && (
        <div className="text-center space-y-6 animate-fade-in max-w-2xl relative">
          <div className="inline-block p-4 rounded-full bg-gray-800 border border-gray-700 mb-4 shadow-xl">
             <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">🧾</span>
          </div>
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

      {/* ================= Questions (Step 1~4) ================= */}
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

      {/* ================= Result (Compact Receipt) ================= */}
      {step === 99 && (
        <div className="w-full max-w-sm animate-slide-up pb-10">
          
          <div className="bg-white text-black p-5 rounded-t-xl shadow-2xl relative font-mono pb-8">
            
            {/* 1. Header Section */}
            <div className="text-center border-b-2 border-dashed border-gray-300 pb-3 mb-3">
              <h2 className="text-xl font-black tracking-tighter uppercase">Order Ticket</h2>
              <p className="text-[10px] text-gray-600 mt-0.5">{new Date().toLocaleDateString()}</p>
            </div>

            {/* 2. Main Result Section */}
            <div className="text-center mb-4 border-b-2 border-dashed border-gray-300 pb-4">
              <div className="text-5xl mb-2">{finalResult.emoji}</div>
              <h3 className="text-lg font-black uppercase leading-tight mb-1">{finalResult.name}</h3>
              <p className="text-[10px] text-gray-700 font-sans leading-relaxed px-1 break-keep">{finalResult.description}</p>
            </div>

            {/* 3. Analysis Section - Increased Spacing (mb-2 -> mb-4) */}
            <div className="space-y-2 mb-4 pb-4 border-b-2 border-dashed border-gray-300">
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest text-center mb-4">
                Analysis
              </p>
              {ANALYSIS_METRICS.map((metric, idx) => {
                const isLeftSelected = answers[idx] === metric.leftVal;
                
                return (
                  <div key={metric.label} className="flex items-center justify-between text-[9px] h-5 border-b border-dotted border-gray-200 last:border-0">
                    
                    {/* Left Column: Label */}
                    <span className="font-bold text-gray-600 uppercase tracking-wider w-20 shrink-0 whitespace-nowrap text-left">
                      {idx + 1}. {metric.label}
                    </span>

                    {/* Right Column: Fixed Width Container for alignment */}
                    <div className="w-48 grid grid-cols-2 gap-1"> 
                      
                      {/* Option A (Left Checkbox) */}
                      <div className={`flex items-center gap-1.5 ${isLeftSelected ? 'text-black font-bold' : 'text-gray-400'}`}>
                        <span className="text-[10px] w-3 text-center shrink-0">{isLeftSelected ? '☑' : '☐'}</span>
                        <span className="truncate">{metric.leftLabel}</span>
                      </div>

                      {/* Option B (Right Checkbox) */}
                      <div className={`flex items-center gap-1.5 ${!isLeftSelected ? 'text-black font-bold' : 'text-gray-400'}`}>
                        <span className="text-[10px] w-3 text-center shrink-0">{!isLeftSelected ? '☑' : '☐'}</span>
                        <span className="truncate">{metric.rightLabel}</span>
                      </div>
                      
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4. Tags Section - Increased Spacing (mb-2 -> mb-4) */}
            <div className="mb-4 text-center pb-4 border-b-2 border-dashed border-gray-300">
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest text-center mb-4">
                Tasting Notes
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {finalResult.tags.slice(0, 3).map((tag, idx) => ( 
                  <span key={tag} className="px-2 py-0.5 rounded border bg-purple-50 border-purple-200 text-purple-700 text-[10px] font-bold uppercase tracking-wide">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Chefs Section - Increased Spacing (mb-2 -> mb-4) */}
            <div className="mb-2">
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest text-center mb-4">
                Head Chefs
              </p>
              
              <div className="flex justify-center gap-4">
                {finalResult.chefs && finalResult.chefs.map((chef, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 w-20">
                    
                    {/* Icon & Region Badge */}
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl shadow-sm border border-gray-200 text-gray-700">
                        👨‍🍳
                      </div>
                      <span className={`absolute -bottom-1 -right-1 text-[7px] font-bold px-1 py-px rounded text-white border border-white ${chef.region === 'KR' ? 'bg-black' : 'bg-gray-500'}`}>
                        {chef.region}
                      </span>
                    </div>

                    {/* Name */}
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

            {/* [Modified] Brand Logo & Name with Divider Line */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-300 flex items-center justify-center gap-1.5 opacity-90">
                {/* Logo Placeholder */}
                <div className="text-blue-500 flex items-center">
                    <span className="text-sm leading-none">🔼</span> 
                </div>
                {/* Brand Name */}
                <span className="text-blue-500 font-sans font-bold text-sm tracking-tight leading-none">
                    unlisted
                </span>
            </div>
            
            {/* Jagged Edge */}
             <div className="absolute bottom-[-10px] left-0 w-full h-[10px] bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-2 px-2">
            <div className="flex gap-2">
              <button onClick={() => router.push('/radio')} className="flex-[2] py-3 bg-neon-gradient text-white rounded-lg font-bold text-xs shadow-lg shadow-purple-900/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-1">
                <span>🎧</span> Play Recipe
              </button>
              <button onClick={handleHome} className="flex-1 py-3 bg-[#1A1A1A] border border-gray-700 text-gray-300 rounded-lg font-bold hover:bg-[#252525] hover:text-white transition text-xs flex items-center justify-center gap-1">
                <span>🏠</span> Home
              </button>
            </div>
            <button onClick={handleShare} className="w-full py-3 bg-white text-black rounded-lg font-bold text-xs hover:bg-gray-200 transition flex items-center justify-center gap-1 shadow-sm">
              <span>🔗</span> Share Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicOmakase;
