import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExchangePreview = ({ 
  exchangeType,
  category,
  title,
  description,
  files,
  wantedType,
  wantedDescription,
  estimatedValue,
  duration,
  location,
  isPhysical,
  trustLevel,
  isPublic
}) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'service': return 'Briefcase';
      case 'product': return 'Package';
      case 'giftcard': return 'CreditCard';
      default: return 'Circle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'service': return 'var(--color-primary)';
      case 'product': return 'var(--color-secondary)';
      case 'giftcard': return 'var(--color-accent)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getTrustBadge = (level) => {
    switch (level) {
      case 'basic': return { icon: 'Mail', label: 'Email Verified', color: 'var(--color-muted-foreground)' };
      case 'standard': return { icon: 'Phone', label: 'Phone Verified', color: 'var(--color-warning)' };
      case 'enhanced': return { icon: 'CheckCircle', label: 'ID Verified', color: 'var(--color-success)' };
      case 'premium': return { icon: 'Crown', label: 'Premium Member', color: 'var(--color-accent)' };
      default: return { icon: 'User', label: 'Basic', color: 'var(--color-muted-foreground)' };
    }
  };

  const formatDescription = (text) => {
    if (!text) return '';
    return text?.split('\n')?.map((line, index) => (
      <span key={index}>
        {line}
        {index < text?.split('\n')?.length - 1 && <br />}
      </span>
    ));
  };

  const trustBadge = getTrustBadge(trustLevel);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Preview Header */}
      <div className="bg-muted/30 px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">Exchange Preview</span>
          </div>
          <div className="flex items-center space-x-2">
            {isPublic ? (
              <div className="flex items-center space-x-1 text-success">
                <Icon name="Globe" size={14} />
                <span className="text-xs">Public</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Lock" size={14} />
                <span className="text-xs">Private</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Exchange Header */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={20} color="var(--color-muted-foreground)" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-foreground">Your Name</span>
              <div className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-full">
                <Icon name={trustBadge?.icon} size={12} color={trustBadge?.color} />
                <span className="text-xs text-muted-foreground">{trustBadge?.label}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Posted just now</p>
          </div>
        </div>

        {/* Exchange Title and Type */}
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-lg ${
              exchangeType === 'service' ? 'bg-primary/10' :
              exchangeType === 'product'? 'bg-secondary/10' : 'bg-accent/10'
            }`}>
              <Icon 
                name={getTypeIcon(exchangeType)} 
                size={20} 
                color={getTypeColor(exchangeType)}
              />
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {exchangeType} Exchange
              </span>
              {category && (
                <span className="text-xs text-muted-foreground"> • {category}</span>
              )}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {title || 'Your Exchange Title'}
          </h2>
        </div>

        {/* Exchange Description */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">What I'm Offering</h3>
          <div className="text-sm text-muted-foreground leading-relaxed">
            {description ? formatDescription(description) : 'Your detailed description will appear here...'}
          </div>
        </div>

        {/* Files Preview */}
        {files && files?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Supporting Files</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {files?.slice(0, 4)?.map((fileObj, index) => (
                <div key={fileObj?.id} className="relative">
                  {fileObj?.preview ? (
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={fileObj?.preview}
                        alt={fileObj?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                      <Icon name="File" size={24} color="var(--color-muted-foreground)" />
                    </div>
                  )}
                  {index === 3 && files?.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium">+{files?.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What I Want */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="ArrowRight" size={16} color="var(--color-secondary)" />
            <span>What I Want in Return</span>
          </h3>
          <div className="text-sm text-muted-foreground">
            {wantedDescription ? formatDescription(wantedDescription) : 'Your requirements will appear here...'}
          </div>
          {estimatedValue && (
            <div className="mt-2 flex items-center space-x-2">
              <Icon name="DollarSign" size={14} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">${estimatedValue} estimated value</span>
            </div>
          )}
        </div>

        {/* Exchange Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <span className="text-muted-foreground">
              Duration: {duration === 'ongoing' ? 'Ongoing' : `${duration} days`}
            </span>
          </div>
          {isPhysical && location && (
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Location: {location}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-4 border-t border-border">
          <Button variant="outline" className="flex-1">
            <Icon name="MessageSquare" size={16} />
            Contact
          </Button>
          <Button variant="default" className="flex-1">
            <Icon name="ArrowLeftRight" size={16} />
            Propose Exchange
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Heart" size={16} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Share" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExchangePreview;