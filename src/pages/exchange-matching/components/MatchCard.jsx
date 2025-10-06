import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MatchCard = ({ match, onViewDetails, onSendRequest }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getResponseTimeColor = (time) => {
    if (time === 'Within 1 hour') return 'text-success';
    if (time === 'Within 4 hours') return 'text-primary';
    return 'text-muted-foreground';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} color="var(--color-warning)" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={14} color="var(--color-warning)" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} color="var(--color-border)" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-all duration-200 hover:border-primary/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={match?.avatar}
              alt={match?.name}
              className="w-12 h-12 rounded-full object-cover"
              onLoad={() => setIsImageLoading(false)}
            />
            {match?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{match?.name}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(match?.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                ({match?.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-medium ${getCompatibilityColor(match?.compatibilityScore)}`}>
            {match?.compatibilityScore}% Match
          </div>
          <div className="text-xs text-muted-foreground">{match?.location}</div>
        </div>
      </div>
      {/* Exchange Offering */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Package" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">Offering:</span>
        </div>
        <h4 className="font-medium text-foreground mb-2">{match?.offering?.title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {match?.offering?.description}
        </p>
      </div>
      {/* Exchange Images */}
      {match?.offering?.images && match?.offering?.images?.length > 0 && (
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {match?.offering?.images?.slice(0, 3)?.map((image, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={image}
                  alt={`${match?.offering?.title} ${index + 1}`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
            ))}
            {match?.offering?.images?.length > 3 && (
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  +{match?.offering?.images?.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Exchange Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-1 mb-1">
            <Icon name="DollarSign" size={14} color="var(--color-success)" />
            <span className="text-xs text-muted-foreground">Est. Value</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            ${match?.offering?.estimatedValue}
          </span>
        </div>
        <div>
          <div className="flex items-center space-x-1 mb-1">
            <Icon name="Clock" size={14} color="var(--color-primary)" />
            <span className="text-xs text-muted-foreground">Response Time</span>
          </div>
          <span className={`text-sm font-medium ${getResponseTimeColor(match?.responseTime)}`}>
            {match?.responseTime}
          </span>
        </div>
      </div>
      {/* Looking For */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Search" size={16} color="var(--color-secondary)" />
          <span className="text-sm font-medium text-foreground">Looking for:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {match?.lookingFor?.slice(0, 3)?.map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
            >
              {item}
            </span>
          ))}
          {match?.lookingFor?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{match?.lookingFor?.length - 3} more
            </span>
          )}
        </div>
      </div>
      {/* Status Indicators */}
      <div className="flex items-center space-x-4 mb-4">
        {match?.isOnline && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-success">Online now</span>
          </div>
        )}
        {match?.lastActive && !match?.isOnline && (
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">
              Active {match?.lastActive}
            </span>
          </div>
        )}
        {match?.exchangeCount > 0 && (
          <div className="flex items-center space-x-1">
            <Icon name="Repeat" size={12} color="var(--color-primary)" />
            <span className="text-xs text-muted-foreground">
              {match?.exchangeCount} exchanges
            </span>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(match)}
          className="flex-1"
          iconName="Eye"
          iconPosition="left"
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onSendRequest(match)}
          className="flex-1"
          iconName="Send"
          iconPosition="left"
        >
          Send Request
        </Button>
      </div>
    </div>
  );
};

export default MatchCard;