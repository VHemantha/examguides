/**
 * Per-niche configuration registry.
 * Every color token, schema type, exam name, and ad slot is defined here.
 * The build system reads this to generate per-page CSS vars, schema, and nav.
 */

export const BASE_URL = process.env.SITE_BASE_URL || 'https://examguides.com';
export const ADSENSE_CLIENT = process.env.ADSENSE_CLIENT || '';
export const SITE_NAME = 'ExamGuides';
export const SITE_TAGLINE = 'Free Exam Prep for High-Stakes Certifications';

export const NICHES = {
  'insurance-adjuster': {
    name: 'Insurance Adjuster',
    slug: 'insurance-adjuster',
    colorPrimary: '#1a4a8a',
    colorAccent: '#e8a020',
    colorPrimaryDark: '#0f2d5c',
    examName: 'Insurance Adjuster Licensing Exam',
    schemaType: 'Course',
    icon: '🏠',
    description: 'Pass your insurance adjuster licensing exam with comprehensive study guides, practice questions, and cheat sheets for all 50 states.',
    keywords: ['insurance adjuster exam', 'adjuster license', 'property claims adjuster', 'casualty adjuster', 'all-lines adjuster'],
    adSlots: {
      banner: '1234567890',
      sidebar: '0987654321',
      mid: '1122334455',
    },
  },
  'medical-coding': {
    name: 'Medical Coding',
    slug: 'medical-coding',
    colorPrimary: '#0d7377',
    colorAccent: '#e05a00',
    colorPrimaryDark: '#085558',
    examName: 'CPC Exam (AAPC) / CCS Exam (AHIMA)',
    schemaType: 'Course',
    icon: '⚕️',
    description: 'Master medical coding for the CPC and CCS exams. ICD-10-CM guides, CPT code references, and practice scenarios.',
    keywords: ['CPC exam prep', 'medical coding certification', 'ICD-10 coding', 'CPT codes', 'AAPC CPC', 'AHIMA CCS'],
    adSlots: {
      banner: '2345678901',
      sidebar: '1098765432',
      mid: '2233445566',
    },
  },
  'real-estate': {
    name: 'Real Estate',
    slug: 'real-estate',
    colorPrimary: '#2d6a2d',
    colorAccent: '#b8860b',
    colorPrimaryDark: '#1a3d1a',
    examName: 'Real Estate Salesperson License Exam',
    schemaType: 'Course',
    icon: '🏡',
    description: 'Prepare for your real estate license exam with property law guides, math formula sheets, and state-specific practice questions.',
    keywords: ['real estate license exam', 'real estate exam prep', 'real estate math', 'property law', 'real estate salesperson'],
    adSlots: {
      banner: '3456789012',
      sidebar: '2109876543',
      mid: '3344556677',
    },
  },
  'hvac': {
    name: 'HVAC',
    slug: 'hvac',
    colorPrimary: '#b33000',
    colorAccent: '#0077cc',
    colorPrimaryDark: '#7a2000',
    examName: 'EPA 608 Certification / NATE Exam',
    schemaType: 'Course',
    icon: '❄️',
    description: 'Ace the EPA 608 certification and NATE exam with refrigerant guides, load calculation tools, and technical reference sheets.',
    keywords: ['EPA 608 exam', 'HVAC certification', 'NATE certification', 'refrigerant handling', 'EPA 608 study guide'],
    adSlots: {
      banner: '4567890123',
      sidebar: '3210987654',
      mid: '4455667788',
    },
  },
  'privacy-cipp': {
    name: 'Privacy / CIPP',
    slug: 'privacy-cipp',
    colorPrimary: '#4a1a8a',
    colorAccent: '#cc4400',
    colorPrimaryDark: '#2d0f5c',
    examName: 'CIPP/US Certification (IAPP)',
    schemaType: 'Course',
    icon: '🔒',
    description: 'Study for the CIPP/US certification with US privacy law guides, CCPA vs HIPAA comparisons, and scenario-based practice questions.',
    keywords: ['CIPP/US exam', 'privacy certification', 'CCPA study guide', 'data privacy law', 'IAPP certification'],
    adSlots: {
      banner: '5678901234',
      sidebar: '4321098765',
      mid: '5566778899',
    },
  },
};

/** Returns the niche config for a given slug, or null */
export function getNicheConfig(slug) {
  return NICHES[slug] || null;
}

/** Returns all niche slugs in order */
export function getNicheSlugs() {
  return Object.keys(NICHES);
}
