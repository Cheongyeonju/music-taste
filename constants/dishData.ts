// src/constants/dishData.ts

export type DishCode = 'S' | 'B' | 'C' | 'D' | 'O' | 'P' | 'F' | 'H'; 

export interface ChefInfo {
  name: string;
  region: 'KR' | 'GL'; // KR: Domestic, GL: Global
  image?: string;      // 프로필 이미지 주소 (선택사항)
}

// [Updated] 4지 선다형 질문 리스트 (상황 기반 선택)
// 4개의 선택지지만, 결과값(Value)은 2개씩 매핑되어 기존 로직(2분할)과 호환됩니다.
export const QUESTIONS = [
  // STEP 1. Base (Melody vs Story)
  {
    id: 1,
    category: 'STEP 01. Select Base',
    query: "What determines your 'First Impression' of a song?",
    options: [
      // S 성향 (Sound/Melody) - 2개
      { 
        text: "🎵 Addictive Melody", 
        subtext: "I hum the tune all day, even if I don't know the lyrics.", 
        value: 'S' 
      },
      { 
        text: "🎹 Instrumental & Beat", 
        subtext: "The sound intro hooks me immediately. Lyrics come second.", 
        value: 'S' 
      },
      // B 성향 (Story/Book) - 2개
      { 
        text: "📖 Relatable Lyrics", 
        subtext: "I listen when the lyrics feel like my own story.", 
        value: 'B' 
      },
      { 
        text: "🎤 Artist's Voice & Emotion", 
        subtext: "The tone and emotional delivery matter most.", 
        value: 'B' 
      }
    ]
  },

  // STEP 2. Intensity (Mild vs Spicy)
  {
    id: 2,
    category: 'STEP 02. Select Intensity',
    query: "What kind of energy do you need right now?",
    options: [
      // C 성향 (Cloud/Mild) - 2개
      { 
        text: "☁️ Deep Sleep & Relax", 
        subtext: "Calm music to relieve stress and drift away.", 
        value: 'C' 
      },
      { 
        text: "☕ Focus & Concentration", 
        subtext: "Stable background music for working or studying.", 
        value: 'C' 
      },
      // D 성향 (Dynamic/Spicy) - 2개
      { 
        text: "🔥 Workout & Drive", 
        subtext: "Pumping beats to boost my adrenaline.", 
        value: 'D' 
      },
      { 
        text: "🎉 Party & Hype", 
        subtext: "Explosive energy to go crazy and have fun.", 
        value: 'D' 
      }
    ]
  },

  // STEP 3. Texture (Organic vs Processed)
  {
    id: 3,
    category: 'STEP 03. Select Texture',
    query: "Which sound texture feels better to you?",
    options: [
      // O 성향 (Organic) - 2개
      { 
        text: "🌿 Raw Acoustic", 
        subtext: "Unplugged guitar or piano sounds without effects.", 
        value: 'O' 
      },
      { 
        text: "🥁 Live Band Sound", 
        subtext: "Realistic drums and bass like a live concert.", 
        value: 'O' 
      },
      // P 성향 (Processed/Electric) - 2개
      { 
        text: "✨ Dreamy Synthesizer", 
        subtext: "Soft, misty, and atmospheric digital sounds.", 
        value: 'P' 
      },
      { 
        text: "🤖 Futuristic Electronic", 
        subtext: "Precise, glitchy, and cool mechanical sounds.", 
        value: 'P' 
      }
    ]
  },

  // STEP 4. Garnish (Famous vs Hidden)
  {
    id: 4,
    category: 'STEP 04. Select Garnish',
    query: "How do you usually discover new music?",
    options: [
      // F 성향 (Famous) - 2개
      { 
        text: "🏆 Top 100 Charts", 
        subtext: "I trust what everyone else is listening to.", 
        value: 'F' 
      },
      { 
        text: "📱 Trending on Social Media", 
        subtext: "Songs I heard on Reels, TikTok, or Shorts.", 
        value: 'F' 
      },
      // H 성향 (Hidden) - 2개
      { 
        text: "⛏️ Digging & Exploring", 
        subtext: "I search related artists to find hidden gems.", 
        value: 'H' 
      },
      { 
        text: "💿 Hidden B-Sides", 
        subtext: "I prefer album tracks over the main title song.", 
        value: 'H' 
      }
    ]
  }
];

export interface RecipeResult {
  name: string;
  description: string;
  emoji: string;
  tags: string[];
  chefs: ChefInfo[];
}

// [Updated] Expanded Chef Pool & Food Concepts
export const RECIPES: Record<string, RecipeResult> = {
  'SCOF': { 
    name: 'Fluffy Souffle Pancake', 
    description: 'Just like a soft souffle pancake, you prefer warm, cozy acoustic pop. A comfortable melody that everyone loves is your favorite flavor.', 
    emoji: '🥞', 
    tags: ['Acoustic Pop', 'Warm', 'Soft', 'Brunch'],
    chefs: [
      {name: '10CM', region: 'KR'}, {name: 'IU', region: 'KR'}, {name: 'AKMU', region: 'KR'}, {name: 'Paul Kim', region: 'KR'}, {name: 'Standing Egg', region: 'KR'}, {name: 'Bolbbalgan4', region: 'KR'},
      {name: 'Ed Sheeran', region: 'GL'}, {name: 'Jason Mraz', region: 'GL'}, {name: 'Lauv', region: 'GL'}, {name: 'Bruno Mars', region: 'GL'}, {name: 'Lukas Graham', region: 'GL'}, {name: 'Jeremy Zucker', region: 'GL'}
    ]
  },
  'SCOH': { 
    name: 'Homemade Greek Yogurt', 
    description: 'Like thick, organic Greek yogurt, you enjoy the raw and healthy taste of nature. You prefer discovering hidden indie folk gems over processed commercial hits.', 
    emoji: '🥣', 
    tags: ['Indie Folk', 'Organic', 'Pure', 'Healing'],
    chefs: [
      {name: 'Sunwoojunga', region: 'KR'}, {name: 'OKDAL', region: 'KR'}, {name: 'Lucid Fall', region: 'KR'}, {name: 'Coffee Boy', region: 'KR'}, {name: 'Kang Asol', region: 'KR'}, {name: 'Lee Lang', region: 'KR'},
      {name: 'Norah Jones', region: 'GL'}, {name: 'Bon Iver', region: 'GL'}, {name: 'Sufjan Stevens', region: 'GL'}, {name: 'Kings of Convenience', region: 'GL'}, {name: 'Iron & Wine', region: 'GL'}, {name: 'Fleet Foxes', region: 'GL'}
    ]
  },
  'SCPF': { 
    name: 'Strawberry Cream Latte', 
    description: 'Like a sweet strawberry latte, you love soft but polished electronic sounds. Lo-fi beats and chill pop with a cute vibe are your perfect match.', 
    emoji: '🍓', 
    tags: ['Lo-fi', 'Chill Pop', 'Trendy', 'Sweet'],
    chefs: [
      {name: 'Yerin Baek', region: 'KR'}, {name: 'BOL4', region: 'KR'}, {name: 'Heize', region: 'KR'}, {name: 'BIBI', region: 'KR'}, {name: 'Hoody', region: 'KR'}, {name: 'LeeHi', region: 'KR'},
      {name: 'Lauv', region: 'GL'}, {name: 'Ariana Grande', region: 'GL'}, {name: 'Troye Sivan', region: 'GL'}, {name: 'Pink Sweat$', region: 'GL'}, {name: 'NIKI', region: 'GL'}, {name: 'Doja Cat', region: 'GL'}
    ]
  },
  'SCPH': { 
    name: 'Cotton Candy Cloud', 
    description: 'Like cotton candy floating in the sky, you crave dreamy synthesizer sounds. You enjoy getting lost in a magical, pastel-colored musical atmosphere.', 
    emoji: '☁️', 
    tags: ['Dream Pop', 'Synth', 'Fluffy', 'Magical'],
    chefs: [
      {name: 'Oh My Girl', region: 'KR'}, {name: 'Dosii', region: 'KR'}, {name: 'Seori', region: 'KR'}, {name: 'Yukika', region: 'KR'}, {name: 'LOONA', region: 'KR'}, {name: 'WJSN', region: 'KR'},
      {name: 'Conan Gray', region: 'GL'}, {name: 'Troye Sivan', region: 'GL'}, {name: 'LANY', region: 'GL'}, {name: 'The 1975', region: 'GL'}, {name: 'Clairo', region: 'GL'}, {name: 'Beach House', region: 'GL'}
    ]
  },
  'SDOF': { 
    name: 'Crispy Fried Chicken', 
    description: 'Like crispy chicken with a cold beer, you need refreshing and explosive energy! Powerful pop-rock band sounds are your stress reliever.', 
    emoji: '🍗', 
    tags: ['Pop Rock', 'Energy', 'Cool', 'Festival'],
    chefs: [
      {name: 'DAY6', region: 'KR'}, {name: 'LUCY', region: 'KR'}, {name: 'N.Flying', region: 'KR'}, {name: 'Young K', region: 'KR'}, {name: 'CNBLUE', region: 'KR'}, {name: 'FTISLAND', region: 'KR'},
      {name: 'Coldplay', region: 'GL'}, {name: 'Maroon 5', region: 'GL'}, {name: 'Imagine Dragons', region: 'GL'}, {name: '5 Seconds of Summer', region: 'GL'}, {name: 'OneRepublic', region: 'GL'}, {name: 'The Script', region: 'GL'}
    ]
  },
  'SDOH': { 
    name: 'Spicy Street Taco', 
    description: 'Like a rough but addictive street taco, you love raw, unpolished garage rock energy. You prefer the wild, spicy kick of the underground scene.', 
    emoji: '🌮', 
    tags: ['Garage Rock', 'Raw', 'Wild', 'Spicy'],
    chefs: [
      {name: 'SE SO NEON', region: 'KR'}, {name: 'HYUKOH', region: 'KR'}, {name: 'Silica Gel', region: 'KR'}, {name: 'Thornapple', region: 'KR'}, {name: 'Galaxy Express', region: 'KR'}, {name: 'Crying Nut', region: 'KR'},
      {name: 'Arctic Monkeys', region: 'GL'}, {name: 'The Strokes', region: 'GL'}, {name: 'Oasis', region: 'GL'}, {name: 'Måneskin', region: 'GL'}, {name: 'The White Stripes', region: 'GL'}, {name: 'Nirvana', region: 'GL'}
    ]
  },
  'SDPF': { 
    name: 'Popping Candy Ice Cream', 
    description: 'Like popping candy in your mouth, you seek flashy and stimulating K-Pop dance tracks. You enjoy colorful, energetic, and catchy flavors.', 
    emoji: '🍦', 
    tags: ['K-Pop', 'Dance', 'Flashy', 'Exciting'],
    chefs: [
      {name: 'NewJeans', region: 'KR'}, {name: 'SEVENTEEN', region: 'KR'}, {name: 'IVE', region: 'KR'}, {name: 'NCT DREAM', region: 'KR'}, {name: 'TWICE', region: 'KR'}, {name: 'Stray Kids', region: 'KR'},
      {name: 'Dua Lipa', region: 'GL'}, {name: 'Bruno Mars', region: 'GL'}, {name: 'Doja Cat', region: 'GL'}, {name: 'Justin Bieber', region: 'GL'}, {name: 'Katy Perry', region: 'GL'}, {name: 'Lady Gaga', region: 'GL'}
    ]
  },
  'SDPH': { 
    name: 'High-Caffeine Energy Drink', 
    description: 'Like a strong energy drink, you want a heart-pounding digital rush. You are addicted to the unpredictable and futuristic taste of Hyperpop.', 
    emoji: '⚡', 
    tags: ['Hyperpop', 'Glitch', 'Future', 'Intense'],
    chefs: [
      {name: 'aespa', region: 'KR'}, {name: 'Silica Gel', region: 'KR'}, {name: '250', region: 'KR'}, {name: 'Glen Check', region: 'KR'}, {name: 'Hitchhiker', region: 'KR'}, {name: 'CIFIKA', region: 'KR'},
      {name: 'Charli XCX', region: 'GL'}, {name: '100 gecs', region: 'GL'}, {name: 'SOPHIE', region: 'GL'}, {name: 'Grimes', region: 'GL'}, {name: 'Arca', region: 'GL'}, {name: 'Bladee', region: 'GL'}
    ]
  },
  'BCOF': { 
    name: 'Warm Americano', 
    description: 'Like a classic Americano, you appreciate the deep, bittersweet taste of life. Emotional ballads with meaningful lyrics are your soul food.', 
    emoji: '☕', 
    tags: ['Ballad', 'Classic', 'Deep', 'Emotional'],
    chefs: [
      {name: 'Park Hyo Shin', region: 'KR'}, {name: 'Sung Si Kyung', region: 'KR'}, {name: 'Paul Kim', region: 'KR'}, {name: 'MeloMance', region: 'KR'}, {name: 'Kim Dong Ryul', region: 'KR'}, {name: 'Jung Seung Hwan', region: 'KR'},
      {name: 'Adele', region: 'GL'}, {name: 'Sam Smith', region: 'GL'}, {name: 'John Legend', region: 'GL'}, {name: 'Lewis Capaldi', region: 'GL'}, {name: 'Ed Sheeran', region: 'GL'}, {name: 'Coldplay', region: 'GL'}
    ]
  },
  'BCOH': { 
    name: 'Earl Grey Tea', 
    description: 'Like a fragrant cup of Earl Grey at dawn, you prefer calm and quiet indie music. You enjoy savoring the lyrics alone in a peaceful atmosphere.', 
    emoji: '🫖', 
    tags: ['Indie', 'Calm', 'Scented', 'Relaxing'],
    chefs: [
      {name: 'Jannabi', region: 'KR'}, {name: 'Kwak Jin Eon', region: 'KR'}, {name: 'Car, the garden', region: 'KR'}, {name: 'Hyukoh', region: 'KR'}, {name: 'Kim Sawol', region: 'KR'}, {name: 'Broccoli, you too?', region: 'KR'},
      {name: 'Cigarettes After Sex', region: 'GL'}, {name: 'Bruno Major', region: 'GL'}, {name: 'Daniel Caesar', region: 'GL'}, {name: 'Honua', region: 'GL'}, {name: 'Phoebe Bridgers', region: 'GL'}, {name: 'Novo Amor', region: 'GL'}
    ]
  },
  'BCPF': { 
    name: 'Vintage Red Wine', 
    description: 'Like aged red wine, you have a sophisticated taste for groovy R&B. You enjoy the stylish, intoxicating vibe of the city night.', 
    emoji: '🍷', 
    tags: ['R&B', 'Soul', 'City Pop', 'Classy'],
    chefs: [
      {name: 'Crush', region: 'KR'}, {name: 'DEAN', region: 'KR'}, {name: 'Zion.T', region: 'KR'}, {name: 'Colde', region: 'KR'}, {name: 'George', region: 'KR'}, {name: 'SOLE', region: 'KR'},
      {name: 'The Weeknd', region: 'GL'}, {name: 'SZA', region: 'GL'}, {name: 'Frank Ocean', region: 'GL'}, {name: 'H.E.R.', region: 'GL'}, {name: 'Khalid', region: 'GL'}, {name: 'Giveon', region: 'GL'}
    ]
  },
  'BCPH': { 
    name: 'Dark Chocolate (99%)', 
    description: 'Like bitter dark chocolate, you focus on the deep essence of sound. You prefer minimal ambient music that sinks into the abyss.', 
    emoji: '🍫', 
    tags: ['Ambient', 'Deep', 'Dark', 'Focus'],
    chefs: [
      {name: 'Byul.org', region: 'KR'}, {name: 'Lang Lee', region: 'KR'}, {name: 'Mid-Air Thief', region: 'KR'}, {name: 'Parannoul', region: 'KR'}, {name: 'Say Sue Me', region: 'KR'}, {name: 'Jambinai', region: 'KR'},
      {name: 'Honne', region: 'GL'}, {name: 'Rhye', region: 'GL'}, {name: 'James Blake', region: 'GL'}, {name: 'Bonobo', region: 'GL'}, {name: 'Tycho', region: 'GL'}, {name: 'Four Tet', region: 'GL'}
    ]
  },
  'BDOF': { 
    name: 'Spicy Mala Soup', 
    description: 'Like tongue-numbing Mala soup, you want to explode your emotions with Emo Rock. You release sadness and anger through spicy, intense sounds.', 
    emoji: '🥘', 
    tags: ['Emo Rock', 'Explosive', 'Hot', 'Crying'],
    chefs: [
      {name: 'YB', region: 'KR'}, {name: 'Jaurim', region: 'KR'}, {name: 'Nell', region: 'KR'}, {name: 'Guckkasten', region: 'KR'}, {name: 'No Brain', region: 'KR'}, {name: 'Crying Nut', region: 'KR'},
      {name: 'Imagine Dragons', region: 'GL'}, {name: 'Paramore', region: 'GL'}, {name: 'My Chemical Romance', region: 'GL'}, {name: 'Linkin Park', region: 'GL'}, {name: 'Green Day', region: 'GL'}, {name: 'Fall Out Boy', region: 'GL'}
    ]
  },
  'BDOH': { 
    name: 'Smoky Aged Whisky', 
    description: 'Like strong whisky, you enjoy the rough, mature taste of Blues and Jazz. You appreciate the heavy, deep stories of life in the music.', 
    emoji: '🥃', 
    tags: ['Jazz', 'Blues', 'Vintage', 'Mature'],
    chefs: [
      {name: 'Kim Kwang Seok', region: 'KR'}, {name: 'Lee Sora', region: 'KR'}, {name: 'Jang Pil Soon', region: 'KR'}, {name: 'Han Young Ae', region: 'KR'}, {name: 'Kim Hyun Sik', region: 'KR'}, {name: 'WoongSan', region: 'KR'},
      {name: 'Chet Baker', region: 'GL'}, {name: 'Amy Winehouse', region: 'GL'}, {name: 'Norah Jones', region: 'GL'}, {name: 'Tom Misch', region: 'GL'}, {name: 'Gregory Porter', region: 'GL'}, {name: 'Ray Charles', region: 'GL'}
    ]
  },
  'BDPF': { 
    name: 'Double Shot Espresso', 
    description: 'Like a punchy double shot, you need heavy beats and serious rap. You prefer the bold, dark, and strong flavor of Hip-hop.', 
    emoji: '🎤', 
    tags: ['Hip-Hop', 'Dark', 'Bold', 'Punchy'],
    chefs: [
      {name: 'Beenzino', region: 'KR'}, {name: 'E-Sens', region: 'KR'}, {name: 'Changmo', region: 'KR'}, {name: 'BewhY', region: 'KR'}, {name: 'Dynamic Duo', region: 'KR'}, {name: 'Epik High', region: 'KR'},
      {name: 'Drake', region: 'GL'}, {name: 'Kendrick Lamar', region: 'GL'}, {name: 'Travis Scott', region: 'GL'}, {name: 'Kanye West', region: 'GL'}, {name: 'J. Cole', region: 'GL'}, {name: 'Eminem', region: 'GL'}
    ]
  },
  'BDPH': { 
    name: 'Ice Cold Vodka', 
    description: 'Like cold vodka, you enjoy the mechanical and detached vibe of Techno. You are drawn to the cool, dystopian taste of industrial sounds.', 
    emoji: '🧊', 
    tags: ['Techno', 'Cold', 'Industrial', 'Club'],
    chefs: [
      {name: 'IDIOTAPE', region: 'KR'}, {name: '250', region: 'KR'}, {name: 'Kirara', region: 'KR'}, {name: 'Hitchhiker', region: 'KR'}, {name: 'Moon Yirang', region: 'KR'}, {name: 'Lionclad', region: 'KR'},
      {name: 'Daft Punk', region: 'GL'}, {name: 'The Chemical Brothers', region: 'GL'}, {name: 'Aphex Twin', region: 'GL'}, {name: 'Kraftwerk', region: 'GL'}, {name: 'Skrillex', region: 'GL'}, {name: 'Gesaffelstein', region: 'GL'}
    ]
  },
  'default': { 
    name: 'Classic Vanilla Ice Cream', 
    description: 'A smooth and sweet pop track that is universally appealing to everyone.', 
    emoji: '🍨', 
    tags: ['Pop', 'Sweet', 'Universal', 'Classic'],
    chefs: [
      {name: 'IU', region: 'KR'}, {name: 'BTS', region: 'KR'}, {name: 'NewJeans', region: 'KR'}, {name: 'AKMU', region: 'KR'}, {name: 'Lim Young Woong', region: 'KR'}, {name: 'PSY', region: 'KR'},
      {name: 'Taylor Swift', region: 'GL'}, {name: 'Justin Bieber', region: 'GL'}, {name: 'Ed Sheeran', region: 'GL'}, {name: 'Ariana Grande', region: 'GL'}, {name: 'The Weeknd', region: 'GL'}, {name: 'Harry Styles', region: 'GL'}
    ]
  }
};