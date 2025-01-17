export const FEATURE_FLAGS = {
    FEATURE_SECTION_2: {
        enabled: process.env.NEXT_PUBLIC_FEATURE_SECTION_2_ENABLED === 'true',
    },
    FAQ_SECTION: {
        enabled: process.env.NEXT_PUBLIC_FAQ_SECTION_ENABLED === 'true',
    },
    HERO_SECTION: {
        enabled: process.env.NEXT_PUBLIC_HERO_SECTION_ENABLED === 'true',
    },
    DEMO_SECTION: {
        enabled: process.env.NEXT_PUBLIC_DEMO_SECTION_ENABLED === 'true',
    },
    HOW_IT_WORKS_SECTION: {
        enabled: process.env.NEXT_PUBLIC_HOW_IT_WORKS_SECTION_ENABLED === 'true',
    },
    FEATURES_SECTION: {
        enabled: process.env.NEXT_PUBLIC_FEATURES_SECTION_ENABLED === 'true',
    },
    FEATURES_SECTION_2: {
        enabled: process.env.NEXT_PUBLIC_FEATURES_SECTION_2_ENABLED === 'true',
    },
    HOW_IT_WORKS_2: {
        enabled: process.env.NEXT_PUBLIC_HOW_IT_WORKS_2_ENABLED === 'true',
    },
} as const;

export type FeatureName = keyof typeof FEATURE_FLAGS;