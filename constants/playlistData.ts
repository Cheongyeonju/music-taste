// Unlisted AI에게 보낼 "음악 주문서" 타입 정의
interface TagRecipe {
  genre: string; // 메인 장르
  mood: string;  // 메인 무드
  tags: string[]; // 상세 태그들
}

// 16가지 결과 코드별 맞춤 레시피 (장르/무드/태그 조합)
export const TAG_RECIPES: Record<string, TagRecipe> = {
  // ------------------------------------------------------------------
  // [S] Sound/Beat 중심 (Rhythmic, Sensational)
  // ------------------------------------------------------------------

  // 1. SCOF (Sound + Calm + Organic + Famous) -> "어쿠스틱 팝/R&B"
  SCOF: { 
    genre: 'R&B', 
    mood: 'Chill', 
    tags: ['Contemporary R&B', 'Acoustic', 'Smooth', 'Cafe', 'Male Vocals', 'Guitar-led', 'Cozy', 'Afternoon'] 
  },
  // 2. SCOH (Sound + Calm + Organic + Hidden) -> "인디 포크/로파이"
  SCOH: { 
    genre: 'Indie Folk', 
    mood: 'Relaxed', 
    tags: ['Lo-Fi', 'Chillhop', 'Bedroom Pop', 'Warm', 'Rainy', 'Reading', 'Raw', 'Intimate Vocals'] 
  },
  // 3. SCPF (Sound + Calm + Processed + Famous) -> "트렌디한 칠 팝/일렉"
  SCPF: { 
    genre: 'Pop', 
    mood: 'Groovy', 
    tags: ['Chill R&B', 'Synth Pop', 'Modern Pop', 'City', 'Clean', 'Polished', 'Sunset', 'Lounge'] 
  },
  // 4. SCPH (Sound + Calm + Processed + Hidden) -> "몽환적인 칠웨이브"
  SCPH: { 
    genre: 'Electronic', 
    mood: 'Dreamy', 
    tags: ['Chillwave', 'Downtempo', 'Ambient Pop', 'Spacey', 'Night', 'Floating', 'Hazy', 'Minimal'] 
  },
  // 5. SDOF (Sound + Dynamic + Organic + Famous) -> "신나는 팝 밴드/펑크"
  SDOF: { 
    genre: 'Pop Rock', 
    mood: 'Happy', 
    tags: ['Funk', 'Up-Tempo', 'Live Drums', 'Summer', 'Drive', 'Feel-Good', 'Bouncy', 'Brass'] 
  },
  // 6. SDOH (Sound + Dynamic + Organic + Hidden) -> "거친 매력의 얼터너티브"
  SDOH: { 
    genre: 'Alternative Rock', 
    mood: 'Energetic', 
    tags: ['Garage Rock', 'Indie Rock', 'Gritty', 'Raw', 'High Energy', 'Electric Guitar', 'Distorted', 'Cool'] 
  },
  // 7. SDPF (Sound + Dynamic + Processed + Famous) -> "페스티벌/클럽 뱅어"
  SDPF: { 
    genre: 'K-Pop', 
    mood: 'Hype', 
    tags: ['EDM', 'Dance Pop', 'Club', 'Party', 'Workout', 'Catchy hook', 'Drop', 'High Energy'] 
  },
  // 8. SDPH (Sound + Dynamic + Processed + Hidden) -> "힙하고 강렬한 비트"
  SDPH: { 
    genre: 'Hip-Hop', 
    mood: 'Dark', 
    tags: ['Trap', 'Phonk', 'Drill', 'Aggressive', 'Night', 'Gym', 'Sub bass', '808'] 
  },

  // ------------------------------------------------------------------
  // [B] Background/Story 중심 (Lyrical, Cinematic)
  // ------------------------------------------------------------------

  // 9. BCOF (Background + Calm + Organic + Famous) -> "감성 발라드/OST"
  BCOF: { 
    genre: 'Pop', 
    mood: 'Romantic', 
    tags: ['Piano Solo', 'Ballad', 'Emotional', 'Love', 'Rainy window', 'Sentimental', 'Strings', 'Clean'] 
  },
  // 10. BCOH (Background + Calm + Organic + Hidden) -> "새벽 감성 재즈바"
  BCOH: { 
    genre: 'Jazz', 
    mood: 'Moody', 
    tags: ['Smooth Jazz', 'Noir', 'Late Night', 'Slow tempo', 'Sax', 'Piano-led', 'Atmospheric', 'Solo'] 
  },
  // 11. BCPF (Background + Calm + Processed + Famous) -> "세련된 시티팝"
  BCPF: { 
    genre: 'City Pop', 
    mood: 'Nostalgic', 
    tags: ['Retro', '80s', 'Neon city', 'Night drive', 'Synth-led', 'Groovy', 'Midnight', 'Stylish'] 
  },
  // 12. BCPH (Background + Calm + Processed + Hidden) -> "새벽의 앰비언트"
  BCPH: { 
    genre: 'Ambient', 
    mood: 'Focus', 
    tags: ['Meditation', 'Soundscape', 'Deep Focus', 'Sleep', 'Drone', 'Ethereal', 'Study', 'Minimal'] 
  },
  // 13. BDOF (Background + Dynamic + Organic + Famous) -> "웅장한 뮤지컬/팝"
  BDOF: { 
    genre: 'Pop', 
    mood: 'Dramatic', 
    tags: ['Orchestral', 'Cinematic', 'Anthemic', 'Powerful', 'Build-up', 'Grand', 'Epic', 'Show'] 
  },
  // 14. BDOH (Background + Dynamic + Organic + Hidden) -> "이국적인 밴드 사운드"
  BDOH: { 
    genre: 'World', 
    mood: 'Adventure', 
    tags: ['Latin Pop', 'Bossa Nova', 'Rhythmic', 'Travel', 'Percussion', 'Live', 'Exotic', 'Warm'] 
  },
  // 15. BDPF (Background + Dynamic + Processed + Famous) -> "트렌디한 힙합/알앤비"
  BDPF: { 
    genre: 'Hip-Hop', 
    mood: 'Trendy', 
    tags: ['Melodic Rap', 'Trap Soul', 'Trendy', 'Fashion', 'Viral hit', 'Flex', 'Youthful', 'Auto-tune'] 
  },
  // 16. BDPH (Background + Dynamic + Processed + Hidden) -> "실험적인 전자음악"
  BDPH: { 
    genre: 'Electronic', 
    mood: 'Futuristic', 
    tags: ['Glitch', 'Hyperpop', 'Cyberpunk', 'Gaming', 'Fast-paced', 'Distorted', 'Experimental', 'Unique'] 
  },
  
  // 예외 처리 (기본값)
  default: { 
    genre: 'Pop', 
    mood: 'Happy', 
    tags: ['Daily', 'Mix', 'Trending'] 
  }
};