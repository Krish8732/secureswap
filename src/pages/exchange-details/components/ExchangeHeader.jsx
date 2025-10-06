import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useCurrency } from '../../../contexts/CurrencyContext';

const ExchangeHeader = ({ exchange, onBack, onMessage, onDispute }) => {
  const { formatAmount } = useCurrency();

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-primary bg-primary/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'completed': return 'text-success bg-success/10';
      case 'disputed': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Activity';
      case 'pending': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'disputed': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          Back to Dashboard
        </Button>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={onMessage}
          >
            Message Partner
          </Button>
          
          {exchange?.status === 'active' && (
            <Button
              variant="destructive"
              iconName="AlertTriangle"
              iconPosition="left"
              onClick={onDispute}
            >
              Report Issue
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Exchange #{exchange?.id}
          </h1>
          <p className="text-muted-foreground mb-4">
            Created on {exchange?.createdAt} • Expires {exchange?.expiresAt}
          </p>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(exchange?.status)}`}>
              <Icon name={getStatusIcon(exchange?.status)} size={16} />
              <span className="capitalize">{exchange?.status}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Users" size={16} />
              <span>2 participants</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} />
              <span>Secure Exchange</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1">Total Value</div>
          <div className="text-2xl font-semibold text-foreground">
            {formatAmount(exchange?.totalValue)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeHeader;