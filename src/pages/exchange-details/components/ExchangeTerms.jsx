import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExchangeTerms = ({ terms, policies }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const termsSections = [
    {
      id: 'general',
      title: 'General Terms',
      icon: 'FileText',
      content: terms?.general || `Both parties agree to exchange the specified items/services as described. All exchanges are final once completed and confirmed by both parties. SecureSwap acts as a facilitator and is not responsible for the quality or condition of exchanged items.`
    },
    {
      id: 'responsibilities',
      title: 'Responsibilities',
      icon: 'Users',
      content: terms?.responsibilities || `Each party is responsible for accurately describing their offering, providing authentic items/services, and communicating clearly throughout the exchange process. Misrepresentation may result in account suspension.`
    },
    {
      id: 'cancellation',
      title: 'Cancellation Policy',
      icon: 'XCircle',
      content: policies?.cancellation || `Exchanges can be cancelled before both parties commit. After mutual commitment, cancellation requires agreement from both parties or dispute resolution. Frequent cancellations may affect your reputation score.`
    },
    {
      id: 'disputes',
      title: 'Dispute Resolution',
      icon: 'AlertTriangle',
      content: policies?.disputes || `If issues arise, parties should first attempt direct resolution through our messaging system. If unresolved, either party can initiate formal dispute resolution. Our team will review evidence and make a binding decision within 5-7 business days.`
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: 'Shield',
      content: policies?.privacy || `Personal information is only revealed after mutual commitment. We use encryption to protect all data and communications. Contact information is automatically hidden after exchange completion unless both parties agree to maintain contact.`
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={16} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Exchange Terms & Policies</h3>
          <p className="text-sm text-muted-foreground">
            Important information about this exchange
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {termsSections?.map((section) => (
          <div key={section?.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full p-4 text-left hover:bg-muted/50 transition-smooth flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Icon name={section?.icon} size={16} color="var(--color-muted-foreground)" />
                <span className="font-medium text-foreground">{section?.title}</span>
              </div>
              <Icon 
                name={expandedSection === section?.id ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                color="var(--color-muted-foreground)"
              />
            </button>
            
            {expandedSection === section?.id && (
              <div className="px-4 pb-4 border-t border-border bg-muted/20">
                <p className="text-sm text-foreground leading-relaxed pt-3">
                  {section?.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-start space-x-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-warning mb-1">Important Notice</h4>
            <p className="text-xs text-muted-foreground">
              By participating in this exchange, you acknowledge that you have read and agree to these terms. 
              SecureSwap provides the platform but is not a party to the actual exchange between users.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Last updated: September 4, 2025</span>
        <Button variant="ghost" size="xs">
          <Icon name="ExternalLink" size={12} className="mr-1" />
          Full Terms of Service
        </Button>
      </div>
    </div>
  );
};

export default ExchangeTerms;