// src/constants/dishData.ts

export type DishCode = 'S' | 'B' | 'C' | 'D' | 'O' | 'P' | 'F' | 'H'; 

export interface ChefInfo {
  name: string;
  region: 'KR' | 'GL'; // KR: Domestic, GL: Global
  image?: string;      // 프로필 이미지 주소 (선택사항)
}

// [Updated] 4지 선다형 질문 리스트 (기존 유지)
export const QUESTIONS = [
  // STEP 1. Base (Melody vs Story)
  {
    id: 1,
    category: 'STEP 01. Select Base',
    query: "What determines your 'First Impression' of a song?",
    options: [
      { text: "🎵 Addictive Melody", subtext: "I hum the tune all day, even if I don't know the lyrics.", value: 'S' },
      { text: "🎹 Instrumental & Beat", subtext: "The sound intro hooks me immediately. Lyrics come second.", value: 'S' },
      { text: "📖 Relatable Lyrics", subtext: "I listen when the lyrics feel like my own story.", value: 'B' },
      { text: "🎤 Artist's Voice & Emotion", subtext: "The tone and emotional delivery matter most.", value: 'B' }
    ]
  },
  // STEP 2. Intensity (Mild vs Spicy)
  {
    id: 2,
    category: 'STEP 02. Select Intensity',
    query: "What kind of energy do you need right now?",
    options: [
      { text: "☁️ Deep Sleep & Relax", subtext: "Calm music to relieve stress and drift away.", value: 'C' },
      { text: "☕ Focus & Concentration", subtext: "Stable background music for working or studying.", value: 'C' },
      { text: "🔥 Workout & Drive", subtext: "Pumping beats to boost my adrenaline.", value: 'D' },
      { text: "🎉 Party & Hype", subtext: "Explosive energy to go crazy and have fun.", value: 'D' }
    ]
  },
  // STEP 3. Texture (Organic vs Processed)
  {
    id: 3,
    category: 'STEP 03. Select Texture',
    query: "Which sound texture feels better to you?",
    options: [
      { text: "🌿 Raw Acoustic", subtext: "Unplugged guitar or piano sounds without effects.", value: 'O' },
      { text: "🥁 Live Band Sound", subtext: "Realistic drums and bass like a live concert.", value: 'O' },
      { text: "✨ Dreamy Synthesizer", subtext: "Soft, misty, and atmospheric digital sounds.", value: 'P' },
      { text: "🤖 Futuristic Electronic", subtext: "Precise, glitchy, and cool mechanical sounds.", value: 'P' }
    ]
  },
  // STEP 4. Garnish (Famous vs Hidden)
  {
    id: 4,
    category: 'STEP 04. Select Garnish',
    query: "How do you usually discover new music?",
    options: [
      { text: "🏆 Top 100 Charts", subtext: "I trust what everyone else is listening to.", value: 'F' },
      { text: "📱 Trending on Social Media", subtext: "Songs I heard on Reels, TikTok, or Shorts.", value: 'F' },
      { text: "⛏️ Digging & Exploring", subtext: "I search related artists to find hidden gems.", value: 'H' },
      { text: "💿 Hidden B-Sides", subtext: "I prefer album tracks over the main title song.", value: 'H' }
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

// [Updated] Unified English Results (쉐프 데이터는 유지, 결과 텍스트만 통일된 값으로 교체)
export const RECIPES: Record<string, RecipeResult> = {
  // [S] Melody Focus / C: Mild
  'SCOF': { 
    name: 'Sweet Soufflé Pancake', 
    description: 'Melodies melting softly in your mouth. A warm, fluffy dessert course that everyone loves.', 
    emoji: '🥞', 
    tags: ['Acoustic', 'Sweet', 'EasyListening'],
    chefs: [
      {name: '10CM', region: 'KR'}, {name: 'IU', region: 'KR'}, {name: 'AKMU', region: 'KR'}, {name: 'Paul Kim', region: 'KR'}, {name: 'Standing Egg', region: 'KR'}, {name: 'Bolbbalgan4', region: 'KR'},
      {name: 'Ed Sheeran', region: 'GL'}, {name: 'Jason Mraz', region: 'GL'}, {name: 'Lauv', region: 'GL'}, {name: 'Bruno Mars', region: 'GL'}, {name: 'Lukas Graham', region: 'GL'}, {name: 'Jeremy Zucker', region: 'GL'}
    ]
  },
  'SCOH': { 
    name: 'Hidden Forest Herb Tea', 
    description: 'Scent of nature found in a secret forest. A healing tea time with pure, non-stimulating sounds.', 
    emoji: '🍵', 
    tags: ['Organic', 'IndieFolk', 'Healing'],
    chefs: [
      {name: 'Sunwoojunga', region: 'KR'}, {name: 'OKDAL', region: 'KR'}, {name: 'Lucid Fall', region: 'KR'}, {name: 'Coffee Boy', region: 'KR'}, {name: 'Kang Asol', region: 'KR'}, {name: 'Lee Lang', region: 'KR'},
      {name: 'Norah Jones', region: 'GL'}, {name: 'Bon Iver', region: 'GL'}, {name: 'Sufjan Stevens', region: 'GL'}, {name: 'Kings of Convenience', region: 'GL'}, {name: 'Iron & Wine', region: 'GL'}, {name: 'Fleet Foxes', region: 'GL'}
    ]
  },
  'SCPF': { 
    name: 'City Night Cocktail', 
    description: 'A taste resembling the sophisticated city lights. Intoxicatingly trendy and chill atmosphere.', 
    emoji: '🍸', 
    tags: ['CityPop', 'R&B', 'Trendy'],
    chefs: [
      {name: 'Yerin Baek', region: 'KR'}, {name: 'BOL4', region: 'KR'}, {name: 'Heize', region: 'KR'}, {name: 'BIBI', region: 'KR'}, {name: 'Hoody', region: 'KR'}, {name: 'LeeHi', region: 'KR'},
      {name: 'Lauv', region: 'GL'}, {name: 'Ariana Grande', region: 'GL'}, {name: 'Troye Sivan', region: 'GL'}, {name: 'Pink Sweat$', region: 'GL'}, {name: 'NIKI', region: 'GL'}, {name: 'Doja Cat', region: 'GL'}
    ]
  },
  'SCPH': { 
    name: 'Dreamy Cloud Mousse', 
    description: 'Fluffy texture stimulating dawn sentiments. A dreamlike taste that makes you forget reality.', 
    emoji: '☁️', 
    tags: ['Lo-Fi', 'Dreamy', 'Hipster'],
    chefs: [
      {name: 'Oh My Girl', region: 'KR'}, {name: 'Dosii', region: 'KR'}, {name: 'Seori', region: 'KR'}, {name: 'Yukika', region: 'KR'}, {name: 'LOONA', region: 'KR'}, {name: 'WJSN', region: 'KR'},
      {name: 'Conan Gray', region: 'GL'}, {name: 'Troye Sivan', region: 'GL'}, {name: 'LANY', region: 'GL'}, {name: 'The 1975', region: 'GL'}, {name: 'Clairo', region: 'GL'}, {name: 'Beach House', region: 'GL'}
    ]
  },
  
  // [S] Melody Focus / D: Spicy
  'SDOF': { 
    name: 'Sparkling Limeade', 
    description: 'Cool carbonation that bursts open your heart! Prescribing a refreshing band sound for a stuffy mind.', 
    emoji: '🥤', 
    tags: ['Refreshing', 'Rock', 'Drive'],
    chefs: [
      {name: 'DAY6', region: 'KR'}, {name: 'LUCY', region: 'KR'}, {name: 'N.Flying', region: 'KR'}, {name: 'Young K', region: 'KR'}, {name: 'CNBLUE', region: 'KR'}, {name: 'FTISLAND', region: 'KR'},
      {name: 'Coldplay', region: 'GL'}, {name: 'Maroon 5', region: 'GL'}, {name: 'Imagine Dragons', region: 'GL'}, {name: '5 Seconds of Summer', region: 'GL'}, {name: 'OneRepublic', region: 'GL'}, {name: 'The Script', region: 'GL'}
    ]
  },
  'SDOH': { 
    name: 'Wild Smoked BBQ', 
    description: 'Raw fire taste, unpolished and wild. A rough dish for those who refuse standard recipes.', 
    emoji: '🍖', 
    tags: ['Alternative', 'Garage', 'Wild'],
    chefs: [
      {name: 'SE SO NEON', region: 'KR'}, {name: 'HYUKOH', region: 'KR'}, {name: 'Silica Gel', region: 'KR'}, {name: 'Thornapple', region: 'KR'}, {name: 'Galaxy Express', region: 'KR'}, {name: 'Crying Nut', region: 'KR'},
      {name: 'Arctic Monkeys', region: 'GL'}, {name: 'The Strokes', region: 'GL'}, {name: 'Oasis', region: 'GL'}, {name: 'Måneskin', region: 'GL'}, {name: 'The White Stripes', region: 'GL'}, {name: 'Nirvana', region: 'GL'}
    ]
  },
  'SDPF': { 
    name: 'Popping Candy', 
    description: 'Intense beats popping in your ears! Addictive energy that makes you want to move right now.', 
    emoji: '🍬', 
    tags: ['Dance', 'K-POP', 'Energy'],
    chefs: [
      {name: 'NewJeans', region: 'KR'}, {name: 'SEVENTEEN', region: 'KR'}, {name: 'IVE', region: 'KR'}, {name: 'NCT DREAM', region: 'KR'}, {name: 'TWICE', region: 'KR'}, {name: 'Stray Kids', region: 'KR'},
      {name: 'Dua Lipa', region: 'GL'}, {name: 'Bruno Mars', region: 'GL'}, {name: 'Doja Cat', region: 'GL'}, {name: 'Justin Bieber', region: 'GL'}, {name: 'Katy Perry', region: 'GL'}, {name: 'Lady Gaga', region: 'GL'}
    ]
  },
  'SDPH': { 
    name: 'Spicy Mara Fusion', 
    description: 'Unpredictable harmony of exotic spices. An experimental delicacy for your unique taste.', 
    emoji: '🌶️', 
    tags: ['Glitch', 'Electronic', 'Experimental'],
    chefs: [
      {name: 'aespa', region: 'KR'}, {name: 'Silica Gel', region: 'KR'}, {name: '250', region: 'KR'}, {name: 'Glen Check', region: 'KR'}, {name: 'Hitchhiker', region: 'KR'}, {name: 'CIFIKA', region: 'KR'},
      {name: 'Charli XCX', region: 'GL'}, {name: '100 gecs', region: 'GL'}, {name: 'SOPHIE', region: 'GL'}, {name: 'Grimes', region: 'GL'}, {name: 'Arca', region: 'GL'}, {name: 'Bladee', region: 'GL'}
    ]
  },

  // [B] Story Focus / C: Mild
  'BCOF': { 
    name: 'Warm Home-cooked Meal', 
    description: 'Familiar and cozy like an old diary. Lyrics that touch your heart and offer warm comfort.', 
    emoji: '🍚', 
    tags: ['Ballad', 'Comfort', 'Empathy'],
    chefs: [
      {name: 'Park Hyo Shin', region: 'KR'}, {name: 'Sung Si Kyung', region: 'KR'}, {name: 'Paul Kim', region: 'KR'}, {name: 'MeloMance', region: 'KR'}, {name: 'Kim Dong Ryul', region: 'KR'}, {name: 'Jung Seung Hwan', region: 'KR'},
      {name: 'Adele', region: 'GL'}, {name: 'Sam Smith', region: 'GL'}, {name: 'John Legend', region: 'GL'}, {name: 'Lewis Capaldi', region: 'GL'}, {name: 'Ed Sheeran', region: 'GL'}, {name: 'Coldplay', region: 'GL'}
    ]
  },
  'BCOH': { 
    name: 'Plain Rye Bread', 
    description: 'Deep flavor of ingredients without fancy sauce. Calm lyrics leaving a long, healthy resonance.', 
    emoji: '🥯', 
    tags: ['Indie', 'Lyrical', 'Dawn'],
    chefs: [
      {name: 'Jannabi', region: 'KR'}, {name: 'Kwak Jin Eon', region: 'KR'}, {name: 'Car, the garden', region: 'KR'}, {name: 'Hyukoh', region: 'KR'}, {name: 'Kim Sawol', region: 'KR'}, {name: 'Broccoli, you too?', region: 'KR'},
      {name: 'Cigarettes After Sex', region: 'GL'}, {name: 'Bruno Major', region: 'GL'}, {name: 'Daniel Caesar', region: 'GL'}, {name: 'Honua', region: 'GL'}, {name: 'Phoebe Bridgers', region: 'GL'}, {name: 'Novo Amor', region: 'GL'}
    ]
  },
  'BCPF': { 
    name: 'Dark Chocolate', 
    description: 'Bittersweet yet deep rich flavor. A classy R&B choice perfect for setting the mood.', 
    emoji: '🍫', 
    tags: ['R&B', 'Groove', 'Deep'],
    chefs: [
      {name: 'Crush', region: 'KR'}, {name: 'DEAN', region: 'KR'}, {name: 'Zion.T', region: 'KR'}, {name: 'Colde', region: 'KR'}, {name: 'George', region: 'KR'}, {name: 'SOLE', region: 'KR'},
      {name: 'The Weeknd', region: 'GL'}, {name: 'SZA', region: 'GL'}, {name: 'Frank Ocean', region: 'GL'}, {name: 'H.E.R.', region: 'GL'}, {name: 'Khalid', region: 'GL'}, {name: 'Giveon', region: 'GL'}
    ]
  },
  'BCPH': { 
    name: 'Midnight Red Wine', 
    description: 'Deep scent soothing a complex mind. A glass of music for melancholic but beautiful moods.', 
    emoji: '🍷', 
    tags: ['DawnVibe', 'Alternative', 'Mood'],
    chefs: [
      {name: 'Byul.org', region: 'KR'}, {name: 'Lang Lee', region: 'KR'}, {name: 'Mid-Air Thief', region: 'KR'}, {name: 'Parannoul', region: 'KR'}, {name: 'Say Sue Me', region: 'KR'}, {name: 'Jambinai', region: 'KR'},
      {name: 'Honne', region: 'GL'}, {name: 'Rhye', region: 'GL'}, {name: 'James Blake', region: 'GL'}, {name: 'Bonobo', region: 'GL'}, {name: 'Tycho', region: 'GL'}, {name: 'Four Tet', region: 'GL'}
    ]
  },

  // [B] Story Focus / D: Spicy
  'BDOF': { 
    name: 'Grand T-Bone Steak', 
    description: 'A main dish everyone enjoys together. Dramatic progression and overwhelming story satisfy you.', 
    emoji: '🥩', 
    tags: ['Anthem', 'Dramatic', 'Rock'],
    chefs: [
      {name: 'YB', region: 'KR'}, {name: 'Jaurim', region: 'KR'}, {name: 'Nell', region: 'KR'}, {name: 'Guckkasten', region: 'KR'}, {name: 'No Brain', region: 'KR'}, {name: 'Crying Nut', region: 'KR'},
      {name: 'Imagine Dragons', region: 'GL'}, {name: 'Paramore', region: 'GL'}, {name: 'My Chemical Romance', region: 'GL'}, {name: 'Linkin Park', region: 'GL'}, {name: 'Green Day', region: 'GL'}, {name: 'Fall Out Boy', region: 'GL'}
    ]
  },
  'BDOH': { 
    name: 'Spicy Soul Stew', 
    description: 'Honest and straight-talking like spicy soup. Unstoppable lyrics that clear your stuffy mind.', 
    emoji: '🥘', 
    tags: ['HipHop', 'Message', 'Strong'],
    chefs: [
      {name: 'Kim Kwang Seok', region: 'KR'}, {name: 'Lee Sora', region: 'KR'}, {name: 'Jang Pil Soon', region: 'KR'}, {name: 'Han Young Ae', region: 'KR'}, {name: 'Kim Hyun Sik', region: 'KR'}, {name: 'WoongSan', region: 'KR'},
      {name: 'Chet Baker', region: 'GL'}, {name: 'Amy Winehouse', region: 'GL'}, {name: 'Norah Jones', region: 'GL'}, {name: 'Tom Misch', region: 'GL'}, {name: 'Gregory Porter', region: 'GL'}, {name: 'Ray Charles', region: 'GL'}
    ]
  },
  'BDPF': { 
    name: 'Michelin Signature Course', 
    description: 'Perfect balance of story and popularity. A well-made masterpiece everyone has to admit.', 
    emoji: '🍝', 
    tags: ['Masterpiece', 'Trend', 'AllRounder'],
    chefs: [
      {name: 'Beenzino', region: 'KR'}, {name: 'E-Sens', region: 'KR'}, {name: 'Changmo', region: 'KR'}, {name: 'BewhY', region: 'KR'}, {name: 'Dynamic Duo', region: 'KR'}, {name: 'Epik High', region: 'KR'},
      {name: 'Drake', region: 'GL'}, {name: 'Kendrick Lamar', region: 'GL'}, {name: 'Travis Scott', region: 'GL'}, {name: 'Kanye West', region: 'GL'}, {name: 'J. Cole', region: 'GL'}, {name: 'Eminem', region: 'GL'}
    ]
  },
  'BDPH': { 
    name: 'Artistic Dessert', 
    description: 'A taste like a piece of art beyond music. A dish for gourmets savoring the artist\'s philosophy.', 
    emoji: '🧁', 
    tags: ['Art', 'Conceptual', 'Philosophy'],
    chefs: [
      {name: 'IDIOTAPE', region: 'KR'}, {name: '250', region: 'KR'}, {name: 'Kirara', region: 'KR'}, {name: 'Hitchhiker', region: 'KR'}, {name: 'Moon Yirang', region: 'KR'}, {name: 'Lionclad', region: 'KR'},
      {name: 'Daft Punk', region: 'GL'}, {name: 'The Chemical Brothers', region: 'GL'}, {name: 'Aphex Twin', region: 'GL'}, {name: 'Kraftwerk', region: 'GL'}, {name: 'Skrillex', region: 'GL'}, {name: 'Gesaffelstein', region: 'GL'}
    ]
  },
  
  'default': { 
    name: 'Chef\'s Special', 
    description: 'A mysterious taste that cannot be analyzed! We serve a random course selected by the chef.', 
    emoji: '🍽️', 
    tags: ['Mystery', 'Special'],
    chefs: [
      {name: 'IU', region: 'KR'}, {name: 'BTS', region: 'KR'}, {name: 'NewJeans', region: 'KR'}, {name: 'AKMU', region: 'KR'}, {name: 'Lim Young Woong', region: 'KR'}, {name: 'PSY', region: 'KR'},
      {name: 'Taylor Swift', region: 'GL'}, {name: 'Justin Bieber', region: 'GL'}, {name: 'Ed Sheeran', region: 'GL'}, {name: 'Ariana Grande', region: 'GL'}, {name: 'The Weeknd', region: 'GL'}, {name: 'Harry Styles', region: 'GL'}
    ]
  }
};