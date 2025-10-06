import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const WhatIWantSection = ({ 
  wantedType, 
  wantedCategory, 
  wantedDescription, 
  estimatedValue,
  onWantedTypeChange,
  onWantedCategoryChange, 
  onWantedDescriptionChange,
  onEstimatedValueChange 
}) => {
  const wantedTypes = [
    { value: 'service', label: 'Service' },
    { value: 'product', label: 'Product' },
    { value: 'giftcard', label: 'Gift Card' },
    { value: 'cash', label: 'Cash Payment' },
    { value: 'flexible', label: 'Open to Offers' }
  ];

  const categoryOptions = {
    service: [
      { value: 'web-development', label: 'Web Development' },
      { value: 'graphic-design', label: 'Graphic Design' },
      { value: 'writing', label: 'Writing & Content' },
      { value: 'marketing', label: 'Digital Marketing' },
      { value: 'tutoring', label: 'Tutoring & Education' },
      { value: 'consulting', label: 'Business Consulting' },
      { value: 'photography', label: 'Photography & Video' },
      { value: 'music', label: 'Music & Audio' },
      { value: 'fitness', label: 'Fitness & Wellness' },
      { value: 'legal', label: 'Legal Services' }
    ],
    product: [
      { value: 'electronics', label: 'Electronics' },
      { value: 'books', label: 'Books & Media' },
      { value: 'clothing', label: 'Clothing & Fashion' },
      { value: 'home-garden', label: 'Home & Garden' },
      { value: 'sports', label: 'Sports & Outdoors' },
      { value: 'collectibles', label: 'Collectibles & Art' },
      { value: 'automotive', label: 'Automotive' },
      { value: 'toys-games', label: 'Toys & Games' },
      { value: 'health-beauty', label: 'Health & Beauty' },
      { value: 'tools', label: 'Tools & Hardware' }
    ],
    giftcard: [
      { value: 'retail', label: 'Retail & Shopping' },
      { value: 'dining', label: 'Dining & Food' },
      { value: 'entertainment', label: 'Entertainment' },
      { value: 'gaming', label: 'Gaming' },
      { value: 'travel', label: 'Travel & Hotels' },
      { value: 'mobile', label: 'Mobile & Telecom' },
      { value: 'streaming', label: 'Streaming Services' },
      { value: 'fashion', label: 'Fashion & Apparel' },
      { value: 'tech', label: 'Technology' },
      { value: 'specialty', label: 'Specialty Stores' }
    ]
  };

  const getPlaceholder = () => {
    switch (wantedType) {
      case 'service':
        return `Describe the service you need...\n\nExample:\n• Specific skills or expertise required\n• Project scope and timeline\n• Quality expectations\n• Any special requirements`;
      case 'product':
        return `Describe the product you want...\n\nExample:\n• Brand preferences or requirements\n• Condition expectations (new/used)\n• Specific features needed\n• Size, color, or model preferences`;
      case 'giftcard':
        return `Specify gift card preferences...\n\nExample:\n• Preferred retailers or brands\n• Minimum balance required\n• Acceptable expiration timeframes\n• Any restrictions to avoid`;
      case 'cash':
        return `Specify cash payment details...\n\nExample:\n• Payment method preferences\n• Currency requirements\n• Payment timeline\n• Any additional terms`;
      case 'flexible':
        return `Describe what you might be interested in...\n\nExample:\n• Types of offers you'd consider\n• Value range you're targeting\n• Categories you're open to\n• What you definitely don't want`;
      default:
        return 'Describe what you want in return for your offering...';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="ArrowRight" size={16} color="var(--color-secondary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">What I Want</h3>
          <p className="text-sm text-muted-foreground">Specify what you're looking for in return</p>
        </div>
      </div>
      {/* Wanted Type Selection */}
      <Select
        label="Type of Exchange"
        placeholder="What type of exchange are you seeking?"
        options={wantedTypes}
        value={wantedType}
        onChange={onWantedTypeChange}
        required
      />
      {/* Category Selection (if applicable) */}
      {wantedType && wantedType !== 'cash' && wantedType !== 'flexible' && (
        <Select
          label="Category"
          placeholder={`Select ${wantedType} category...`}
          options={categoryOptions?.[wantedType] || []}
          value={wantedCategory}
          onChange={onWantedCategoryChange}
          searchable={categoryOptions?.[wantedType]?.length > 8}
        />
      )}
      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Detailed Requirements *
        </label>
        <textarea
          value={wantedDescription}
          onChange={onWantedDescriptionChange}
          placeholder={getPlaceholder()}
          className="w-full min-h-[150px] p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-y"
          required
        />
        <p className="text-xs text-muted-foreground">
          Be specific about your requirements to attract the right exchange partners
        </p>
      </div>
      {/* Estimated Value */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Estimated Value (USD)"
          type="number"
          placeholder="0.00"
          value={estimatedValue}
          onChange={onEstimatedValueChange}
          min="0"
          step="0.01"
          description="Approximate value for fair exchange matching"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Value Flexibility</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="valueFlexibility"
                value="exact"
                className="w-4 h-4 text-primary border-border focus:ring-primary"
                defaultChecked
              />
              <span className="text-sm text-foreground">Exact value</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="valueFlexibility"
                value="flexible"
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <span className="text-sm text-foreground">Flexible (±20%)</span>
            </label>
          </div>
        </div>
      </div>
      {/* Exchange Preferences */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Target" size={16} color="var(--color-secondary)" className="mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Matching Tips</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Be specific but not overly restrictive to find more matches</li>
              <li>• Consider multiple options to increase your chances</li>
              <li>• Fair value estimation helps build trust</li>
              <li>• "Open to offers" attracts creative exchange ideas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIWantSection;