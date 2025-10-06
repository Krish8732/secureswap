import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { useCurrency } from '../../../contexts/CurrencyContext';


const ExchangeParticipants = ({ participants, currentUserId, isRevealed }) => {
  const { formatAmount } = useCurrency();

  const currentUser = participants?.find(p => p?.id === currentUserId);
  const partner = participants?.find(p => p?.id !== currentUserId);

  const ParticipantCard = ({ participant, isCurrentUser, isRevealed }) => (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <Image
            src={participant?.avatar}
            alt={participant?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {participant?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={14} color="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-foreground">
              {isCurrentUser ? 'You' : (isRevealed ? participant?.name : 'Partner')}
            </h3>
            {participant?.isPremium && (
              <div className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                Premium
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} />
              <span>{participant?.rating}/5.0</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Trophy" size={14} />
              <span>{participant?.completedExchanges} exchanges</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{isRevealed ? participant?.location : 'Hidden'}</span>
            </div>
          </div>
        </div>
        
        {participant?.commitmentStatus && (
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            participant?.commitmentStatus === 'committed' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
          }`}>
            {participant?.commitmentStatus === 'committed' ? 'Committed' : 'Pending'}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-foreground mb-2">Offering</h4>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={participant?.offering?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-foreground">{participant?.offering?.title}</h5>
                <p className="text-sm text-muted-foreground">{participant?.offering?.category}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-foreground">
                  {formatAmount(participant?.offering?.value)}
                </div>
                <div className="text-xs text-muted-foreground">Estimated Value</div>
              </div>
            </div>
            
            <p className="text-sm text-foreground mb-3">
              {isRevealed || isCurrentUser 
                ? participant?.offering?.description 
                : 'Description will be revealed after both parties commit'
              }
            </p>
            
            {participant?.offering?.images && participant?.offering?.images?.length > 0 && (
              <div className="flex space-x-2 mb-3">
                {participant?.offering?.images?.slice(0, 3)?.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={isRevealed || isCurrentUser ? image : '/assets/images/no_image.png'}
                      alt={`Offering image ${index + 1}`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    {!isRevealed && !isCurrentUser && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <Icon name="Lock" size={16} color="white" />
                      </div>
                    )}
                  </div>
                ))}
                {participant?.offering?.images?.length > 3 && (
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                    +{participant?.offering?.images?.length - 3}
                  </div>
                )}
              </div>
            )}
            
            {participant?.offering?.conditions && (
              <div className="text-xs text-muted-foreground">
                <strong>Conditions:</strong> {
                  isRevealed || isCurrentUser 
                    ? participant?.offering?.conditions 
                    : 'Hidden until commitment'
                }
              </div>
            )}
          </div>
        </div>

        {isRevealed && participant?.contactInfo && (
          <div>
            <h4 className="font-medium text-foreground mb-2">Contact Information</h4>
            <div className="bg-success/5 border border-success/20 rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Mail" size={14} color="var(--color-success)" />
                <span className="text-foreground">{participant?.contactInfo?.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Phone" size={14} color="var(--color-success)" />
                <span className="text-foreground">{participant?.contactInfo?.phone}</span>
              </div>
              {participant?.contactInfo?.preferredTime && (
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Clock" size={14} color="var(--color-success)" />
                  <span className="text-foreground">Best time: {participant?.contactInfo?.preferredTime}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ParticipantCard 
        participant={currentUser} 
        isCurrentUser={true} 
        isRevealed={isRevealed} 
      />
      <ParticipantCard 
        participant={partner} 
        isCurrentUser={false} 
        isRevealed={isRevealed} 
      />
    </div>
  );
};

export default ExchangeParticipants;