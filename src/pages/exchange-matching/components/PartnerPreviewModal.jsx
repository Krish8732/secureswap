import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PartnerPreviewModal = ({ partner, isOpen, onClose, onSendRequest, onViewFullProfile }) => {
  if (!isOpen || !partner) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={16} color="var(--color-warning)" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={16} color="var(--color-warning)" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} color="var(--color-border)" />
      );
    }

    return stars;
  };

  const defaultReviews = [
    {
      id: 1,
      reviewer: "Sarah M.",
      rating: 5,
      comment: "Excellent communication and fast delivery. Highly recommended!",
      date: "2 days ago"
    },
    {
      id: 2,
      reviewer: "Mike R.",
      rating: 4,
      comment: "Great experience overall. Very professional and reliable.",
      date: "1 week ago"
    },
    {
      id: 3,
      reviewer: "Lisa K.",
      rating: 5,
      comment: "Perfect exchange! Everything went smoothly as promised.",
      date: "2 weeks ago"
    }
  ];

  const displayReviews = partner?.recentReviews || defaultReviews;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Partner Preview</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Partner Info */}
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Image
                src={partner?.avatar_url || partner?.avatar}
                alt={partner?.display_name || partner?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {partner?.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{partner?.display_name || partner?.name}</h3>
                {partner?.isOnline && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-success">Online</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {renderStars(partner?.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {partner?.rating} ({partner?.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{partner?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Repeat" size={14} />
                  <span>{partner?.exchangeCount} exchanges</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compatibility Score */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Compatibility Score</h4>
                <p className="text-sm text-muted-foreground">Based on your preferences</p>
              </div>
              <div className="text-2xl font-bold text-primary">
                {partner?.compatibilityScore}%
              </div>
            </div>
          </div>

          {/* Current Offering */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Current Offering</h4>
            <div className="bg-muted rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-2">{partner?.offering?.title}</h5>
              <p className="text-sm text-muted-foreground mb-3">
                {partner?.offering?.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-success">
                  Est. Value: ${partner?.offering?.estimatedValue}
                </span>
                <span className="text-sm text-muted-foreground">
                  Category: {partner?.offering?.category}
                </span>
              </div>
            </div>
          </div>

          {/* Looking For */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Looking For</h4>
            <div className="flex flex-wrap gap-2">
              {partner?.lookingFor?.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Recent Reviews</h4>
            <div className="space-y-3">
              {displayReviews?.map((review) => (
                <div key={review?.id} className="bg-muted rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">
                        {review?.reviewer}
                      </span>
                      <div className="flex items-center space-x-1">
                        {renderStars(review?.rating)}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{review?.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{review?.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time & Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Clock" size={16} color="var(--color-primary)" />
                <span className="text-sm font-medium text-foreground">Response Time</span>
              </div>
              <span className="text-sm text-muted-foreground">{partner?.responseTime}</span>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Calendar" size={16} color="var(--color-secondary)" />
                <span className="text-sm font-medium text-foreground">Member Since</span>
              </div>
              <span className="text-sm text-muted-foreground">{partner?.memberSince || 'March 2023'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-card border-t border-border p-6">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onViewFullProfile}
              className="flex-1"
              iconName="User"
              iconPosition="left"
            >
              View Full Profile
            </Button>
            <Button
              variant="default"
              onClick={() => onSendRequest(partner)}
              className="flex-1"
              iconName="Send"
              iconPosition="left"
            >
              Send Exchange Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPreviewModal;