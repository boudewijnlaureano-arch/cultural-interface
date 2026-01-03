import type { HoverInfo } from "../components/HoverInfoBlock";

const contentMap = {
  1: {
    american: {
      title: "1. Clean Feed (Low Density)",
      text: "This interface uses low information density and strong visual hierarchy. Western social media design favors simplicity, reduced cognitive load, and progressive disclosure to support focused, goal-oriented interaction.\n\nReferences:\nDong & Lee (2008)\nLiljenberg et al. (2019)\nRahman et al. (2024)",
    },
    chinese: {
      title: "1. Dense Feed (High Density)",
      text: "This interface presents many features and content blocks simultaneously. Chinese social media reflects a cultural preference for information abundance, enabling exploration, multitasking, and quick access to diverse functions.\n\nReferences:\nDong & Lee (2008)\nLiljenberg et al. (2019)\nLin (2025)\n2024-2025-LinHHua",
    },
  },
  2: {
    american: {
      title: "2. Minimal & Linear Navigation",
      text: "Navigation is minimal and linear. Users are expected to know their goals in advance and move efficiently through the interface, reflecting low-context communication norms.\n\nReferences:\nDong & Lee (2008)\nLiljenberg et al. (2019)",
    },
    chinese: {
      title: "2. Exploratory Navigation",
      text: "Navigation emphasizes browsing and discovery through categories, trending sections, and recommendations. This supports exploratory behavior common in high-context, polychronic cultures.\n\nReferences:\nLiljenberg et al. (2019)\nLin (2025)\n2024-2025-LinHHua",
    },
  },
  3: {
    american: {
      title: "3. Visual-First Post Format",
      text: "Posts prioritize images and short captions. Visual storytelling and personal self-expression align with individualistic cultural values.\n\nReferences:\nDong & Lee (2008)\nRahman et al. (2024)",
    },
    chinese: {
      title: "3. Layered Post Format",
      text: "Posts often combine images, long text, tags, and emojis. This reflects high-context communication, where meaning is conveyed through layered information rather than minimal captions.\n\nReferences:\nDong & Lee (2008)\nLin (2025)\n2024-2025-LinHHua",
    },
  },
  4: {
    american: {
      title: "4. Authentic Profile Photos",
      text: "Real profile photos are commonly used to emphasize individuality, authenticity, and personal branding on Western social platforms.\n\nReferences:\nDong & Lee (2008)\nRahman et al. (2024)",
    },
    chinese: {
      title: "4. Symbolic Avatars",
      text: "Users often choose symbolic or aesthetic avatars rather than real photos. This reflects cultural sensitivity around modesty, social perception, and maintaining “face” (Miànzi).\n\nReferences:\nLiljenberg et al. (2019)\nLin (2025)\n2024-2025-LinHHua",
    },
  },
  6: {
    american: {
      title: "6. Personalized Trending Content",
      text: "Trending content is less visually dominant, encouraging users to follow personalized interests rather than collective attention.\n\nReferences:\nRahman et al. (2024)\nStatista (Social Networks Overview)",
    },
    chinese: {
      title: "6. Dominant 'Hot' Content",
      text: "Trending or “hot” content is highly visible and labeled. Collective interest serves as social proof and guides user behavior.\n\nReferences:\nLiljenberg et al. (2019)\nLin (2025)\n2024-2025-LinHHua\nStatista (China Digital Platforms)",
    },
  },
  8: {
    american: {
      title: "8. Restrained Advertisements",
      text: "Advertisements are visually restrained and often separated from social content to preserve clarity and user focus.\n\nReferences:\nRahman et al. (2024)\nStatista (US Digital Advertising)",
    },
    chinese: {
      title: "8. Integrated Promotions",
      text: "Promotions are integrated directly into the feed, reflecting the close relationship between social media, commerce, and daily life in China.\n\nReferences:\nLin (2025)\n2024-2025-LinHHua\nStatista (China E-commerce vs US)",
    },
  },
  9: {
    american: {
      title: "9. Neutral Color Palette",
      text: "Neutral colors and consistent branding support long-term usability and visual calm.\n\nReferences:\nDong & Lee (2008)\nLiljenberg et al. (2019)",
    },
    chinese: {
      title: "9. Symbolic Color Palette",
      text: "Bright colors and seasonal theming reflect cultural symbolism and contextual awareness, especially during festivals and events.\n\nReferences:\nDong & Lee (2008)\nLin (2025)\n2024-2025-LinHHua",
    },
  },
  10: {
    summary: {
      title: "10. Final Comparative Summary",
      text: "These two interfaces reflect different cultural assumptions.\nAmerican social media prioritizes clarity, individuality, and efficiency.\nChinese social media prioritizes richness, social validation, and convenience.\nDesign is shaped by culture, not universal rules.\n\nReferences:\nDong & Lee (2008)\nLiljenberg et al. (2019)\nLin (2025)\n2024-2025-LinHHua",
    },
  },
};

function createComparativePanel(
  id: number,
  conceptId: keyof typeof contentMap
): HoverInfo[] {
  const content = contentMap[conceptId];
  if (!("american" in content) || !("chinese" in content)) return [];
  return [
    { id, ...content.american },
    { id, ...content.chinese },
  ];
}

/**
 * Maps a conceptual ID (from your list) to its corresponding hover information.
 */
export const CONCEPT_HOVER_INFO: Record<number, HoverInfo | HoverInfo[]> = {
  1: createComparativePanel(1, 1),
  2: createComparativePanel(2, 2),
  3: createComparativePanel(3, 3),
  4: createComparativePanel(4, 4),
  6: createComparativePanel(6, 6),
  8: createComparativePanel(8, 8),
  9: createComparativePanel(9, 9),
  10: { id: 10, ...contentMap[10].summary },
};

/**
 * Maps a block ID to its corresponding hover information.
 */
export const HOVER_INFO_DATA: Record<number, HoverInfo | HoverInfo[]> = {
  // Link concepts to specific block IDs
  1: CONCEPT_HOVER_INFO[1], // Density -> Left CC 1
  2: CONCEPT_HOVER_INFO[8], // Ads -> Left CC 2
  8: CONCEPT_HOVER_INFO[1], // Density -> Right CC 1
  9: CONCEPT_HOVER_INFO[1], // Density -> Right CC 2
  10: CONCEPT_HOVER_INFO[8], // Ads -> Right CC 3
  11: CONCEPT_HOVER_INFO[8], // Ads -> Right CC 4
};
