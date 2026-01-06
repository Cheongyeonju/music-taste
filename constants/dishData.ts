// src/constants/dishData.ts

export type DishCode = 'S' | 'B' | 'C' | 'D' | 'O' | 'P' | 'F' | 'H'; 

export const QUESTIONS = [
  {
    id: 1,
    category: 'STEP 01. Select Base',
    query: "What 'base' would you like for your music?",
    options: [
      { 
        text: "🎵 Melody Base", 
        subtext: "Focus on catchy beats and humming tunes.", 
        value: 'S' 
      },
      { 
        text: "📖 Story Base", 
        subtext: "Focus on deep lyrics and meaningful messages.", 
        value: 'B' 
      }
    ]
  },
  {
    id: 2,
    category: 'STEP 02. Select Intensity',
    query: "How 'intense' should the flavor be?",
    options: [
      { 
        text: "☁️ Mild (Soft)", 
        subtext: "Easy-listening, comfortable, and relaxing.", 
        value: 'C' 
      },
      { 
        text: "🔥 Spicy (Strong)", 
        subtext: "Heart-pounding, intense, and stimulating.", 
        value: 'D' 
      }
    ]
  },
  {
    id: 3,
    category: 'STEP 03. Select Texture',
    query: "Choose your preferred sound 'texture'.",
    options: [
      { 
        text: "🌿 Organic (Raw)", 
        subtext: "Natural vocals and raw acoustic instruments.", 
        value: 'O' 
      },
      { 
        text: "⚡ Electric (Processed)", 
        subtext: "Polished synthesizers and digital effects.", 
        value: 'P' 
      }
    ]
  },
  {
    id: 4,
    category: 'STEP 04. Select Garnish',
    query: "Finally, pick a 'topping' for your track.",
    options: [
      { 
        text: "🏆 Famous Hit", 
        subtext: "A guaranteed bestseller everyone knows.", 
        value: 'F' 
      },
      { 
        text: "💎 Hidden Special", 
        subtext: "A unique, hidden gem just for you.", 
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
}

export const RECIPES: Record<string, RecipeResult> = {
  // Group 1: Melody Base (S)
  'SCOF': { 
    name: 'Sunday Brunch Acoustic',
    description: 'Like a brunch in warm sunlight, this is a cozy acoustic pop track that everyone enjoys.',
    emoji: '🥞',
    tags: ['Acoustic Pop', 'Spring', 'Cafe']
  },
  'SCOH': { 
    name: 'Secret Garden Folk',
    description: 'Like a fresh salad in a hidden forest, this is a healing indie-folk gem found only by you.',
    emoji: '🥗',
    tags: ['Indie Folk', 'Healing', 'Nature']
  },
  'SCPF': { 
    name: 'Trending Lo-fi Beats',
    description: 'Like a trendy latte in a cafe, these soft electronic lo-fi beats are perfect for chilling.',
    emoji: '🎧',
    tags: ['Lo-fi', 'Chill Pop', 'Trendy']
  },
  'SCPH': { 
    name: 'Dreamy Bedroom Pop',
    description: 'Like fluffy cotton candy, this features dreamy synthesizer sounds floating on clouds.',
    emoji: '☁️',
    tags: ['Bedroom Pop', 'Dreamy', 'Synth']
  },
  'SDOF': { 
    name: 'Festival Rock Anthem',
    description: 'Like a cold soda, this refreshing band sound gives you an explosive burst of energy.',
    emoji: '🎸',
    tags: ['Pop Rock', 'Festival', 'Energy']
  },
  'SDOH': { 
    name: 'Garage Band Discovery',
    description: 'Like a rough street taco, this track is full of raw, unpolished energy and spirit.',
    emoji: '🥁',
    tags: ['Garage Rock', 'Indie', 'Raw']
  },
  'SDPF': { 
    name: 'K-Pop / Dance Hit',
    description: 'Like popping candy, this track is flashy, energetic, and makes you want to dance.',
    emoji: '🍭',
    tags: ['K-Pop', 'Dance', 'Idol']
  },
  'SDPH': { 
    name: 'Hyperpop Glitch',
    description: 'Like an intense energy drink, this features unpredictable and thrilling electronic sounds.',
    emoji: '🍬',
    tags: ['Hyperpop', 'Glitch', 'Future Bass']
  },

  // Group 2: Story Base (B)
  'BCOF': { 
    name: 'Classic Ballad',
    description: 'Like rich espresso, this bittersweet emotional ballad leaves a deep lingering feeling.',
    emoji: '☕',
    tags: ['Ballad', 'Piano', 'Emotional']
  },
  'BCOH': { 
    name: 'Late Night Indie',
    description: 'Like warm tea at dawn, this calm and quiet indie track brings you comfort.',
    emoji: '🌙',
    tags: ['Indie', 'Dawn', 'Acoustic']
  },
  'BCPF': { 
    name: 'City Pop / R&B',
    description: 'Like a sophisticated city cocktail, this is a groovy and stylish R&B track.',
    emoji: '🍸',
    tags: ['R&B', 'City Pop', 'Soul']
  },
  'BCPH': { 
    name: 'Underground Ambient',
    description: 'Like deep ocean flavors, this ambient music makes you focus on the sound itself.',
    emoji: '🌌',
    tags: ['Ambient', 'Chillwave', 'Deep']
  },
  'BDOF': { 
    name: 'Emotional Rock',
    description: 'Like spicy mala soup, this Emo Rock track pours out deep sorrow and anger.',
    emoji: '🥀',
    tags: ['Emo Rock', 'Alternative', 'Band']
  },
  'BDOH': { 
    name: 'Dark Jazz / Blues',
    description: 'Like aged whiskey, this track feels rough, deep, and full of life stories.',
    emoji: '🎷',
    tags: ['Jazz', 'Blues', 'Vintage']
  },
  'BDPF': { 
    name: 'Dark Hip-Hop',
    description: 'Like heavy dark chocolate, this track features weighty beats and serious lyrics.',
    emoji: '🎤',
    tags: ['Hip-Hop', 'Rap', 'Dark']
  },
  'BDPH': { 
    name: 'Industrial Techno',
    description: 'Like the taste of cold metal, this intense techno track paints a dystopian world.',
    emoji: '🏗️',
    tags: ['Techno', 'Industrial', 'Hardcore']
  },

  // Default
  'default': {
    name: 'Classic Vanilla Latte',
    description: 'A smooth and sweet pop track that is universally appealing.',
    emoji: '☕',
    tags: ['Pop', 'R&B', 'Ballad']
  }
};