import React from 'react';
import Icon from '../../../components/AppIcon';

const ExchangeTimeline = ({ timeline }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case 'created': return 'Plus';
      case 'matched': return 'Users';
      case 'committed': return 'Shield';
      case 'revealed': return 'Eye';
      case 'message': return 'MessageSquare';
      case 'completed': return 'CheckCircle';
      case 'cancelled': return 'XCircle';
      case 'disputed': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'created': return 'text-primary';
      case 'matched': return 'text-secondary';
      case 'committed': return 'text-accent';
      case 'revealed': return 'text-success';
      case 'message': return 'text-muted-foreground';
      case 'completed': return 'text-success';
      case 'cancelled': return 'text-destructive';
      case 'disputed': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Exchange Timeline</h3>
      <div className="space-y-4">
        {timeline?.map((event, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-card ${
              index === 0 ? 'border-primary' : 'border-border'
            }`}>
              <Icon 
                name={getEventIcon(event?.type)} 
                size={14} 
                color={index === 0 ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`text-sm font-medium ${getEventColor(event?.type)}`}>
                  {event?.title}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {event?.timestamp}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {event?.description}
              </p>
              
              {event?.actor && (
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-4 h-4 bg-muted rounded-full"></div>
                  <span className="text-xs text-muted-foreground">
                    by {event?.actor}
                  </span>
                </div>
              )}
            </div>
            
            {index < timeline?.length - 1 && (
              <div className="absolute left-4 mt-8 w-0.5 h-6 bg-border"></div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Last updated: {timeline?.[0]?.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeTimeline;