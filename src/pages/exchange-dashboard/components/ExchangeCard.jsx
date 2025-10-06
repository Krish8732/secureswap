import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExchangeCard = ({ exchange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'completed':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'disputed':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'service':
        return 'Briefcase';
      case 'product':
        return 'Package';
      case 'gift_card':
        return 'Gift';
      default:
        return 'ArrowLeftRight';
    }
  };

  const formatTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffHours = Math.ceil((deadlineDate - now) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h remaining`;
    }
    return `${Math.ceil(diffHours / 24)}d remaining`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getTypeIcon(exchange?.type)} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{exchange?.title}</h3>
            <p className="text-sm text-muted-foreground capitalize">{exchange?.type?.replace('_', ' ')} Exchange</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(exchange?.status)}`}>
          {exchange?.status?.charAt(0)?.toUpperCase() + exchange?.status?.slice(1)}
        </span>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Image
            src={exchange?.partner?.avatar}
            alt={exchange?.partner?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-foreground">{exchange?.partner?.name}</p>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} color="var(--color-warning)" />
              <span className="text-xs text-muted-foreground">{exchange?.partner?.rating}</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{exchange?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${exchange?.progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-foreground mb-2">{exchange?.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Value: ${exchange?.value}</span>
          <span>{formatTimeRemaining(exchange?.deadline)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {exchange?.hasNewMessage && (
            <div className="w-2 h-2 bg-destructive rounded-full"></div>
          )}
          <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left">
            Message
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          <Link to="/exchange-details">
            <Button variant="default" size="sm">
              {exchange?.nextAction}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCard;