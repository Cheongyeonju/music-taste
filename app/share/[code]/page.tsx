import type { Metadata } from 'next';
import MusicTaste from '@/components/MusicTaste'; 
import { RECIPES_KO } from '@/constants/dishData';

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const code = resolvedParams.code.toUpperCase();

  const result = RECIPES_KO[code] || RECIPES_KO['default'];
  const fixedDescription = "당신의 음악은 무슨 맛인가요? 지금 확인해보세요.";

  return {
    title: `Music Taste | ${result.name}`, // Tasty -> Taste
    description: fixedDescription,

    openGraph: {
      title: `당신의 음악 취향은 '${result.name}'`,
      description: fixedDescription,
      url: `https://music-taste-unlisted.vercel.app/share/${code}`,
      siteName: 'Music Taste', // Tasty -> Taste
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: "/main-thumb.png",
          width: 1200,
          height: 630,
          alt: "Music Taste Main Thumbnail",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `당신의 음악 취향은 '${result.name}'`,
      description: fixedDescription,
      images: ["/main-thumb.png"],
    },
  };
}

export default function SharePage() {
  return <MusicTaste />;
}