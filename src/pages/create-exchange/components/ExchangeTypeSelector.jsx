import React from 'react';
import Icon from '../../../components/AppIcon';

const ExchangeTypeSelector = ({ selectedType, onTypeChange }) => {
  const exchangeTypes = [
    {
      id: 'service',
      label: 'Service Exchange',
      description: 'Exchange skills, expertise, or professional services',
      icon: 'Briefcase',
      color: 'primary',
      examples: ['Web Development', 'Graphic Design', 'Tutoring', 'Consulting']
    },
    {
      id: 'product',
      label: 'Product Exchange',
      description: 'Trade physical items, electronics, or collectibles',
      icon: 'Package',
      color: 'secondary',
      examples: ['Electronics', 'Books', 'Clothing', 'Home Items']
    },
    {
      id: 'giftcard',
      label: 'Gift Card Exchange',
      description: 'Swap gift cards from different retailers or platforms',
      icon: 'CreditCard',
      color: 'accent',
      examples: ['Amazon', 'iTunes', 'Steam', 'Restaurant Cards']
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Exchange Type</h3>
        <p className="text-sm text-muted-foreground">Choose what type of exchange you want to create</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exchangeTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => onTypeChange(type?.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-elevated ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                type?.color === 'primary' ? 'bg-primary/10' :
                type?.color === 'secondary'? 'bg-secondary/10' : 'bg-accent/10'
              }`}>
                <Icon 
                  name={type?.icon} 
                  size={20} 
                  color={
                    type?.color === 'primary' ? 'var(--color-primary)' :
                    type?.color === 'secondary' ? 'var(--color-secondary)' :
                    'var(--color-accent)'
                  }
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{type?.label}</h4>
                <p className="text-sm text-muted-foreground mb-2">{type?.description}</p>
                <div className="flex flex-wrap gap-1">
                  {type?.examples?.slice(0, 2)?.map((example, index) => (
                    <span
                      key={index}
                      className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                    >
                      {example}
                    </span>
                  ))}
                  {type?.examples?.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{type?.examples?.length - 2} more</span>
                  )}
                </div>
              </div>
            </div>
            {selectedType === type?.id && (
              <div className="mt-3 flex items-center space-x-2 text-primary">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-medium">Selected</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExchangeTypeSelector;