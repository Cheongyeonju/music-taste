// src/constants/dishData.ts

export type DishCode = 'S' | 'B' | 'C' | 'D' | 'O' | 'P' | 'F' | 'H'; 

export const QUESTIONS = [
  {
    id: 1,
    category: 'STEP 01. Select Base',
    query: "What 'base' would you like for your music?",
    options: [
      { text: "🎵 Melody Base", subtext: "Focus on catchy beats and humming tunes.", value: 'S' },
      { text: "📖 Story Base", subtext: "Focus on deep lyrics and meaningful messages.", value: 'B' }
    ]
  },
  {
    id: 2,
    category: 'STEP 02. Select Intensity',
    query: "How 'intense' should the flavor be?",
    options: [
      { text: "☁️ Mild (Soft)", subtext: "Easy-listening, comfortable, and relaxing.", value: 'C' },
      { text: "🔥 Spicy (Strong)", subtext: "Heart-pounding, intense, and stimulating.", value: 'D' }
    ]
  },
  {
    id: 3,
    category: 'STEP 03. Select Texture',
    query: "Choose your preferred sound 'texture'.",
    options: [
      { text: "🌿 Organic (Raw)", subtext: "Natural vocals and raw acoustic instruments.", value: 'O' },
      { text: "⚡ Electric (Processed)", subtext: "Polished synthesizers and digital effects.", value: 'P' }
    ]
  },
  {
    id: 4,
    category: 'STEP 04. Select Garnish',
    query: "Finally, pick a 'topping' for your track.",
    options: [
      { text: "🏆 Famous Hit", subtext: "A guaranteed bestseller everyone knows.", value: 'F' },
      { text: "💎 Hidden Special", subtext: "A unique, hidden gem just for you.", value: 'H' }
    ]
  }
];

export interface RecipeResult {
  name: string;
  description: string;
  emoji: string;
  tags: string[];
}

// [Updated] English Descriptions & Food Concepts
export const RECIPES: Record<string, RecipeResult> = {
  // ------------------------------------------------------------------
  // Group S (Melody Focus)
  // ------------------------------------------------------------------
  'SCOF': { 
    name: 'Fluffy Souffle Pancake', 
    description: 'Just like a soft souffle pancake that melts in your mouth, you prefer warm, cozy acoustic pop. A comfortable melody that everyone loves is your favorite flavor.', 
    emoji: '🥞', 
    tags: ['Acoustic Pop', 'Warm', 'Soft', 'Brunch Vibe'] 
  },
  'SCOH': { 
    name: 'Homemade Greek Yogurt', 
    description: 'Like thick, organic Greek yogurt, you enjoy the raw and healthy taste of nature. You prefer discovering hidden indie folk gems over processed commercial hits.', 
    emoji: '🥣', 
    tags: ['Indie Folk', 'Organic', 'Pure', 'Healing'] 
  },
  'SCPF': { 
    name: 'Strawberry Cream Latte', 
    description: 'Like a sweet and trendy strawberry latte, you love soft but polished electronic sounds. Lo-fi beats and chill pop with a cute vibe are your perfect match.', 
    emoji: '🍓', 
    tags: ['Lo-fi', 'Chill Pop', 'Trendy', 'Sweet'] 
  },
  'SCPH': { 
    name: 'Cotton Candy Cloud', 
    description: 'Like cotton candy floating in the sky, you crave dreamy synthesizer sounds. You enjoy getting lost in a magical, pastel-colored musical atmosphere.', 
    emoji: '☁️', 
    tags: ['Dream Pop', 'Synth', 'Fluffy', 'Magical'] 
  },
  'SDOF': { 
    name: 'Crispy Fried Chicken', 
    description: 'Like crispy chicken with a cold beer, you need refreshing and explosive energy! Powerful pop-rock band sounds are your stress reliever.', 
    emoji: '🍗', 
    tags: ['Pop Rock', 'Energy', 'Cool', 'Festival'] 
  },
  'SDOH': { 
    name: 'Spicy Street Taco', 
    description: 'Like a rough but addictive street taco, you love raw, unpolished garage rock energy. You prefer the wild, spicy kick of the underground scene.', 
    emoji: '🌮', 
    tags: ['Garage Rock', 'Raw', 'Wild', 'Spicy'] 
  },
  'SDPF': { 
    name: 'Popping Candy Ice Cream', 
    description: 'Like popping candy in your mouth, you seek flashy and stimulating K-Pop dance tracks. You enjoy colorful, energetic, and catchy flavors.', 
    emoji: '🍦', 
    tags: ['K-Pop', 'Dance', 'Flashy', 'Exciting'] 
  },
  'SDPH': { 
    name: 'High-Caffeine Energy Drink', 
    description: 'Like a strong energy drink, you want a heart-pounding digital rush. You are addicted to the unpredictable and futuristic taste of Hyperpop.', 
    emoji: '⚡', 
    tags: ['Hyperpop', 'Glitch', 'Future', 'Intense'] 
  },

  // ------------------------------------------------------------------
  // Group B (Story Focus)
  // ------------------------------------------------------------------
  'BCOF': { 
    name: 'Warm Americano', 
    description: 'Like a classic Americano, you appreciate the deep, bittersweet taste of life. Emotional ballads with meaningful lyrics are your soul food.', 
    emoji: '☕', 
    tags: ['Ballad', 'Classic', 'Deep', 'Emotional'] 
  },
  'BCOH': { 
    name: 'Earl Grey Tea', 
    description: 'Like a fragrant cup of Earl Grey at dawn, you prefer calm and quiet indie music. You enjoy savoring the lyrics alone in a peaceful atmosphere.', 
    emoji: '🫖', 
    tags: ['Indie', 'Calm', 'Scented', 'Relaxing'] 
  },
  'BCPF': { 
    name: 'Vintage Red Wine', 
    description: 'Like aged red wine, you have a sophisticated taste for groovy R&B. You enjoy the stylish, intoxicating vibe of the city night.', 
    emoji: '🍷', 
    tags: ['R&B', 'Soul', 'City Pop', 'Classy'] 
  },
  'BCPH': { 
    name: 'Dark Chocolate (99%)', 
    description: 'Like bitter dark chocolate, you focus on the deep essence of sound. You prefer minimal ambient music that sinks into the abyss.', 
    emoji: '🍫', 
    tags: ['Ambient', 'Deep', 'Dark', 'Focus'] 
  },
  'BDOF': { 
    name: 'Spicy Mala Soup', 
    description: 'Like tongue-numbing Mala soup, you want to explode your emotions with Emo Rock. You release sadness and anger through spicy, intense sounds.', 
    emoji: '🥘', 
    tags: ['Emo Rock', 'Explosive', 'Hot', 'Crying'] 
  },
  'BDOH': { 
    name: 'Smoky Aged Whisky', 
    description: 'Like strong whisky, you enjoy the rough, mature taste of Blues and Jazz. You appreciate the heavy, deep stories of life in the music.', 
    emoji: '🥃', 
    tags: ['Jazz', 'Blues', 'Vintage', 'Mature'] 
  },
  'BDPF': { 
    name: 'Double Shot Espresso', 
    description: 'Like a punchy double shot, you need heavy beats and serious rap. You prefer the bold, dark, and strong flavor of Hip-hop.', 
    emoji: '🎤', 
    tags: ['Hip-Hop', 'Dark', 'Bold', 'Punchy'] 
  },
  'BDPH': { 
    name: 'Ice Cold Vodka', 
    description: 'Like cold vodka, you enjoy the mechanical and detached vibe of Techno. You are drawn to the cool, dystopian taste of industrial sounds.', 
    emoji: '🧊', 
    tags: ['Techno', 'Cold', 'Industrial', 'Club'] 
  },

  // Default
  'default': { 
    name: 'Classic Vanilla Ice Cream', 
    description: 'A smooth and sweet pop track that is universally appealing to everyone.', 
    emoji: '🍨', 
    tags: ['Pop', 'Sweet', 'Universal', 'Classic'] 
  }
};