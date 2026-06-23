import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MatchCard = ({ match, onViewDetails, onSendRequest }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // 3D Tilt Effect on Hover
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10 border-success/20';
    if (score >= 75) return 'text-primary bg-primary/10 border-primary/20';
    if (score >= 60) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-muted-foreground bg-black/5 dark:bg-white/5 border-transparent';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={14} className="text-warning fill-warning" />);
    }
    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={14} className="text-warning fill-warning" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-border" />);
    }
    return stars;
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="doppelrand-shell group perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: rotation.x === 0 && rotation.y === 0 ? 'transform 0.5s ease-out' : 'none'
      }}
    >
      <div className="doppelrand-core p-6 h-full flex flex-col transition-all duration-fluid group-hover:shadow-diffusion">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-primary to-accent">
                <Image
                  src={match?.avatar}
                  alt={match?.name}
                  className="w-full h-full rounded-full object-cover border-2 border-card"
                  onLoad={() => setIsImageLoading(false)}
                />
              </div>
              {match?.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-2 border-card rounded-full flex items-center justify-center shadow-sm">
                  <Icon name="Check" size={12} className="text-white" strokeWidth={3} />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground tracking-tight">{match?.name}</h3>
              <div className="flex items-center space-x-2 mt-0.5">
                <div className="flex items-center space-x-0.5">
                  {renderStars(match?.rating)}
                </div>
                <span className="text-xs font-medium text-text-secondary">
                  ({match?.reviewCount})
                </span>
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wide ${getCompatibilityColor(match?.compatibilityScore)}`}>
              {match?.compatibilityScore}% MATCH
            </div>
            <div className="text-xs font-medium text-text-secondary mt-2 flex items-center">
              <Icon name="MapPin" size={12} className="mr-1 opacity-70" />
              {match?.location}
            </div>
          </div>
        </div>

        {/* Exchange Offering */}
        <div className="mb-6 bg-black/5 dark:bg-white/5 p-4 rounded-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="PackageSearch" size={16} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Offering</span>
          </div>
          <h4 className="font-semibold text-foreground mb-1">{match?.offering?.title}</h4>
          <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
            {match?.offering?.description}
          </p>
        </div>

        {/* Exchange Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-2xl border border-border bg-card">
            <span className="text-xs text-text-secondary font-medium block mb-1">Est. Value</span>
            <span className="text-lg font-bold text-foreground">
              ${match?.offering?.estimatedValue?.toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-2xl border border-border bg-card">
            <span className="text-xs text-text-secondary font-medium block mb-1">Response Time</span>
            <span className="text-sm font-semibold text-foreground flex items-center">
              <Icon name="Clock" size={14} className="mr-1.5 text-primary" />
              {match?.responseTime}
            </span>
          </div>
        </div>

        {/* Looking For */}
        <div className="mb-6 flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="ArrowLeftRight" size={16} className="text-secondary" />
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Looking For</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {match?.lookingFor?.slice(0, 3)?.map((item, index) => (
              <span key={index} className="px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium rounded-full">
                {item}
              </span>
            ))}
            {match?.lookingFor?.length > 3 && (
              <span className="px-3 py-1 bg-black/5 dark:bg-white/5 text-text-secondary text-xs font-medium rounded-full">
                +{match?.lookingFor?.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-border mt-auto">
          <Button variant="outline" onClick={() => onViewDetails(match)} className="flex-1" iconName="Eye" iconPosition="left">
            View
          </Button>
          <Button variant="default" onClick={() => onSendRequest(match)} className="flex-1" iconName="ArrowRight" iconPosition="right">
            Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;