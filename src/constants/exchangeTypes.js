/**
 * Exchange type and category constants.
 * Shared across CreateExchange, CategorySelector, WhatIWantSection, etc.
 */

export const EXCHANGE_TYPES = {
  SERVICE: 'service',
  PRODUCT: 'product',
  GIFT_CARD: 'gift_card',
};

export const EXCHANGE_TYPE_LABELS = {
  [EXCHANGE_TYPES.SERVICE]: 'Service',
  [EXCHANGE_TYPES.PRODUCT]: 'Product',
  [EXCHANGE_TYPES.GIFT_CARD]: 'Gift Card',
};

export const EXCHANGE_STATUSES = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PENDING: 'pending',
  MATCHED: 'matched',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DISPUTED: 'disputed',
};

export const EXCHANGE_STATUS_LABELS = {
  [EXCHANGE_STATUSES.DRAFT]: 'Draft',
  [EXCHANGE_STATUSES.ACTIVE]: 'Active',
  [EXCHANGE_STATUSES.PENDING]: 'Pending',
  [EXCHANGE_STATUSES.MATCHED]: 'Matched',
  [EXCHANGE_STATUSES.IN_PROGRESS]: 'In Progress',
  [EXCHANGE_STATUSES.COMPLETED]: 'Completed',
  [EXCHANGE_STATUSES.CANCELLED]: 'Cancelled',
  [EXCHANGE_STATUSES.DISPUTED]: 'Disputed',
};

export const TRUST_LEVELS = {
  STANDARD: 'standard',
  VERIFIED: 'verified',
  PREMIUM: 'premium',
};

export const CATEGORY_OPTIONS = {
  [EXCHANGE_TYPES.SERVICE]: [
    { value: 'web-development', label: 'Web Development', description: 'Websites, web apps, frontend/backend dev' },
    { value: 'mobile-development', label: 'Mobile Development', description: 'iOS, Android, React Native apps' },
    { value: 'graphic-design', label: 'Graphic Design', description: 'Logos, branding, illustrations' },
    { value: 'digital-marketing', label: 'Digital Marketing', description: 'SEO, social media, ads' },
    { value: 'photography', label: 'Photography', description: 'Portrait, event, product photography' },
    { value: 'video-editing', label: 'Video Editing', description: 'Video production and post-processing' },
    { value: 'writing', label: 'Writing & Copywriting', description: 'Articles, blog posts, marketing copy' },
    { value: 'translation', label: 'Translation', description: 'Document and content translation' },
    { value: 'consulting', label: 'Business Consulting', description: 'Strategy, finance, operations' },
    { value: 'tutoring', label: 'Tutoring & Teaching', description: 'Education and skill coaching' },
    { value: 'music', label: 'Music & Audio', description: 'Recording, production, lessons' },
    { value: 'other-service', label: 'Other Service', description: 'Any other professional service' },
  ],
  [EXCHANGE_TYPES.PRODUCT]: [
    { value: 'electronics', label: 'Electronics', description: 'Phones, laptops, gadgets' },
    { value: 'clothing', label: 'Clothing & Fashion', description: 'Apparel, accessories, shoes' },
    { value: 'books', label: 'Books & Media', description: 'Books, DVDs, vinyl records' },
    { value: 'sports', label: 'Sports & Fitness', description: 'Equipment, gear, apparel' },
    { value: 'home-garden', label: 'Home & Garden', description: 'Furniture, decor, tools' },
    { value: 'collectibles', label: 'Collectibles', description: 'Art, antiques, memorabilia' },
    { value: 'gaming', label: 'Gaming', description: 'Consoles, games, accessories' },
    { value: 'tools', label: 'Tools & Equipment', description: 'Professional and DIY tools' },
    { value: 'other-product', label: 'Other Product', description: 'Any other physical item' },
  ],
  [EXCHANGE_TYPES.GIFT_CARD]: [
    { value: 'amazon', label: 'Amazon', description: 'Amazon.com gift cards' },
    { value: 'itunes', label: 'iTunes / App Store', description: 'Apple ecosystem gift cards' },
    { value: 'google-play', label: 'Google Play', description: 'Android apps and content' },
    { value: 'walmart', label: 'Walmart', description: 'Walmart stores and online' },
    { value: 'target', label: 'Target', description: 'Target stores and online' },
    { value: 'steam', label: 'Steam', description: 'PC gaming platform' },
    { value: 'netflix', label: 'Netflix', description: 'Streaming subscription' },
    { value: 'visa-mastercard', label: 'Visa / Mastercard', description: 'Prepaid debit cards' },
    { value: 'other-giftcard', label: 'Other Gift Card', description: 'Any other gift card brand' },
  ],
};

export default {
  EXCHANGE_TYPES,
  EXCHANGE_TYPE_LABELS,
  EXCHANGE_STATUSES,
  EXCHANGE_STATUS_LABELS,
  TRUST_LEVELS,
  CATEGORY_OPTIONS,
};
