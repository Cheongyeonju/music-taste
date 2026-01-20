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

export const RECIPES_KO: Record<string, { name: string; description: string; tags: string[] }> = {
  'SCOF': { name: '달콤한 어쿠스틱 수플레', description: '입안에서 사르르 녹는 멜로디. 호불호 없이 누구나 편안하게 즐길 수 있는 부드러운 디저트 같은 코스입니다.', tags: ['달콤함', '어쿠스틱', '이지리스닝'] },
  'SCOH': { name: '숨겨진 숲속의 허브티', description: '나만 알고 싶은 맑은 향기. 자극적이지 않고 자연 그대로의 소리를 담은 힐링 티 타임입니다.', tags: ['유기농', '인디포크', '힐링'] },
  'SCPF': { name: '도심의 밤 칵테일', description: '세련된 도시의 야경을 닮은 맛. 적당히 트렌디하고 몽환적인 분위기에 취해보세요.', tags: ['시티팝', 'R&B', '세련된'] },
  'SCPH': { name: '몽환적인 구름 무스', description: '새벽 감성을 자극하는 폭신한 질감. 현실을 잠시 잊게 만드는 꿈결 같은 맛입니다.', tags: ['Lo-Fi', '몽환', '힙스터'] },
  'SDOF': { name: '청량한 스파클링 에이드', description: '가슴이 뻥 뚫리는 시원한 탄산! 답답한 속을 시원하게 날려버릴 밴드 사운드를 처방합니다.', tags: ['청량', '록', '드라이브'] },
  'SDOH': { name: '거친 야생의 바베큐', description: '다듬어지지 않은 불맛 그대로. 정형화된 레시피를 거부하는 당신을 위한 와일드한 요리입니다.', tags: ['얼터너티브', '개러지', '유니크'] },
  'SDPF': { name: '톡 쏘는 팝핑 캔디', description: '입안에서 터지는 강렬한 비트와 중독성! 가만히 있을 수 없게 만드는 에너지가 넘칩니다.', tags: ['댄스', 'K-POP', '에너지'] },
  'SDPH': { name: '자극적인 퓨전 마라맛', description: '예측할 수 없는 독특한 향신료의 조화. 평범함을 거부하는 당신을 위한 실험적인 별미입니다.', tags: ['글리치', '전자음악', '실험적'] },
  'BCOF': { name: '따뜻한 집밥 정식', description: '오래된 일기장을 꺼내 보듯 익숙하고 포근한 맛. 가사 하나하나가 마음에 와닿아 위로를 건넵니다.', tags: ['발라드', '위로', '공감'] },
  'BCOH': { name: '담백한 호밀빵 브런치', description: '화려한 소스 없이 재료 본연의 깊은 맛. 담담하게 읊조리는 가사가 긴 여운을 남깁니다.', tags: ['인디', '서정적', '새벽'] },
  'BCPF': { name: '진한 다크 초콜릿', description: '쌉싸름하지만 깊은 풍미가 있는 R&B. 분위기 잡고 싶은 날 꺼내 먹기 좋은 고급스러운 맛입니다.', tags: ['R&B', '그루브', '딥'] },
  'BCPH': { name: '보랏빛 새벽 와인', description: '복잡한 마음을 달래주는 깊은 향기. 우울하지만 아름다운 감성에 젖어들기 좋은 한 잔입니다.', tags: ['새벽감성', '얼터너티브', '무드'] },
  'BDOF': { name: '웅장한 스테이크 플래터', description: '모두가 하나 되어 즐기는 메인 디시. 드라마틱한 전개와 벅찬 서사가 배부른 만족감을 줍니다.', tags: ['앤썸', '드라마틱', '록'] },
  'BDOH': { name: '화끈한 할라피뇨 버거', description: '한 입 베어 물면 스트레스가 풀리는 강렬한 킥! 직설적인 가사와 묵직한 비트가 답답한 속을 시원하게 뚫어줍니다.', tags: ['힙합', '메시지', '강렬'] },
  'BDPF': { name: '미슐랭 시그니처 코스', description: '서사와 대중성, 맛의 밸런스가 완벽한 요리. 누구나 인정할 수밖에 없는 웰메이드 명곡입니다.', tags: ['명곡', '트렌드', '올라운더'] },
  'BDPH': { name: '심오한 예술가 디저트', description: '음악을 넘어 하나의 예술 작품 같은 맛. 아티스트의 철학을 음미하는 미식가를 위한 접시입니다.', tags: ['예술', '컨셉추얼', '철학'] },
  'default': { name: '오늘의 쉐프 추천', description: '분석할 수 없는 신비로운 취향이네요! 쉐프가 엄선한 랜덤 코스를 제공합니다.', tags: ['미스테리'] }
};