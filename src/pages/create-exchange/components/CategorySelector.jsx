import React from 'react';
import Select from '../../../components/ui/Select';

const CategorySelector = ({ exchangeType, selectedCategory, onCategoryChange }) => {
  const categoryOptions = {
    service: [
      { value: 'web-development', label: 'Web Development', description: 'Frontend, Backend, Full-stack development' },
      { value: 'graphic-design', label: 'Graphic Design', description: 'Logo design, branding, illustrations' },
      { value: 'writing', label: 'Writing & Content', description: 'Copywriting, blogging, technical writing' },
      { value: 'marketing', label: 'Digital Marketing', description: 'SEO, social media, advertising' },
      { value: 'tutoring', label: 'Tutoring & Education', description: 'Academic subjects, language learning' },
      { value: 'consulting', label: 'Business Consulting', description: 'Strategy, operations, finance advice' },
      { value: 'photography', label: 'Photography & Video', description: 'Event photography, video editing' },
      { value: 'music', label: 'Music & Audio', description: 'Music production, voice-over, sound design' },
      { value: 'fitness', label: 'Fitness & Wellness', description: 'Personal training, nutrition coaching' },
      { value: 'legal', label: 'Legal Services', description: 'Contract review, legal consultation' }
    ],
    product: [
      { value: 'electronics', label: 'Electronics', description: 'Phones, laptops, gaming devices' },
      { value: 'books', label: 'Books & Media', description: 'Physical books, DVDs, vinyl records' },
      { value: 'clothing', label: 'Clothing & Fashion', description: 'Apparel, shoes, accessories' },
      { value: 'home-garden', label: 'Home & Garden', description: 'Furniture, decor, gardening tools' },
      { value: 'sports', label: 'Sports & Outdoors', description: 'Equipment, gear, outdoor items' },
      { value: 'collectibles', label: 'Collectibles & Art', description: 'Antiques, artwork, rare items' },
      { value: 'automotive', label: 'Automotive', description: 'Car parts, accessories, tools' },
      { value: 'toys-games', label: 'Toys & Games', description: 'Board games, video games, toys' },
      { value: 'health-beauty', label: 'Health & Beauty', description: 'Skincare, makeup, wellness products' },
      { value: 'tools', label: 'Tools & Hardware', description: 'Power tools, hand tools, equipment' }
    ],
    giftcard: [
      { value: 'retail', label: 'Retail & Shopping', description: 'Amazon, Target, Walmart, Best Buy' },
      { value: 'dining', label: 'Dining & Food', description: 'Restaurant chains, food delivery services' },
      { value: 'entertainment', label: 'Entertainment', description: 'Netflix, Spotify, movie theaters' },
      { value: 'gaming', label: 'Gaming', description: 'Steam, PlayStation, Xbox, Nintendo' },
      { value: 'travel', label: 'Travel & Hotels', description: 'Airlines, hotels, booking platforms' },
      { value: 'mobile', label: 'Mobile & Telecom', description: 'Phone carriers, mobile services' },
      { value: 'streaming', label: 'Streaming Services', description: 'Video and music streaming platforms' },
      { value: 'fashion', label: 'Fashion & Apparel', description: 'Clothing brands, fashion retailers' },
      { value: 'tech', label: 'Technology', description: 'Apple, Google Play, tech retailers' },
      { value: 'specialty', label: 'Specialty Stores', description: 'Hobby shops, niche retailers' }
    ]
  };

  const currentOptions = categoryOptions?.[exchangeType] || [];

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-medium text-foreground mb-1">Category</h4>
        <p className="text-sm text-muted-foreground">
          Select the most relevant category for your {exchangeType}
        </p>
      </div>
      <Select
        label="Choose Category"
        placeholder={`Select ${exchangeType} category...`}
        options={currentOptions}
        value={selectedCategory}
        onChange={onCategoryChange}
        searchable={currentOptions?.length > 8}
        required
        className="w-full"
      />
      {selectedCategory && (
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {currentOptions?.find(opt => opt?.value === selectedCategory)?.label}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {currentOptions?.find(opt => opt?.value === selectedCategory)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;