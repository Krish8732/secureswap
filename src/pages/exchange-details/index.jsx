import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ExchangeHeader from './components/ExchangeHeader';
import ExchangeParticipants from './components/ExchangeParticipants';
import CommitmentPanel from './components/CommitmentPanel';
import ExchangeTimeline from './components/ExchangeTimeline';
import MessagingPanel from './components/MessagingPanel';
import ExchangeTerms from './components/ExchangeTerms';
import ExchangeProgressIndicator from '../../components/ui/ExchangeProgressIndicator';

const ExchangeDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exchangeId = searchParams?.get('id') || 'EX-2025-001';
  
  const [currentUserId] = useState('user-123');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showDisputeDialog, setShowDisputeDialog] = useState(false);

  // Mock exchange data
  const [exchangeData, setExchangeData] = useState({
    id: 'EX-2025-001',
    status: 'active',
    createdAt: 'January 15, 2025',
    expiresAt: 'January 22, 2025',
    totalValue: 850,
    currentStep: 3,
    participants: [
      {
        id: 'user-123',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        completedExchanges: 23,
        location: 'San Francisco, CA',
        isVerified: true,
        isPremium: true,
        commitmentStatus: 'committed',
        offering: {
          title: 'Professional Web Development Services',
          category: 'Digital Services',
          value: 450,
          icon: 'Code',
          description: `Complete website development including:\n• Custom responsive design\n• React/Next.js frontend\n• Node.js backend integration\n• SEO optimization\n• 3 months maintenance support\n\nTimeline: 2-3 weeks\nRevisions: Up to 3 rounds included`,
          images: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
          ],
          conditions: 'Client must provide content and branding materials. Hosting setup not included.'
        },
        contactInfo: {
          email: 'alex.johnson@email.com',
          phone: '+1 (555) 123-4567',
          preferredTime: 'Weekdays 9 AM - 6 PM PST'
        }
      },
      {
        id: 'user-456',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        completedExchanges: 31,
        location: 'Austin, TX',
        isVerified: true,
        isPremium: false,
        commitmentStatus: 'committed',
        offering: {
          title: 'Amazon Gift Card Bundle',
          category: 'Gift Cards',
          value: 400,
          icon: 'Gift',
          description: `Bundle includes:\n• $200 Amazon Gift Card (Digital)\n• $100 Amazon Fresh Credit\n• $100 Amazon Prime Video Credit\n\nAll codes are valid and unused\nDigital delivery within 24 hours\nReceipts available for verification`,
          images: [
            'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop'
          ],
          conditions: 'Gift cards are US region locked. No returns after code delivery.'
        },
        contactInfo: {
          email: 'sarah.chen@email.com',
          phone: '+1 (555) 987-6543',
          preferredTime: 'Evenings 6 PM - 10 PM CST'
        }
      }
    ]
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 'user-456',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'Hi Alex! I\'m excited about this exchange. When would be a good time to discuss the project requirements?',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: 2,
      senderId: 'user-123',
      senderName: 'Alex Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'Great! I\'m available tomorrow afternoon. Could you share some details about your business and design preferences?',
      timestamp: new Date(Date.now() - 3000000),
      status: 'read'
    },
    {
      id: 3,
      senderId: 'user-456',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'Perfect! I\'ll prepare a brief with all the details. The gift cards are ready to transfer once we finalize everything.',
      timestamp: new Date(Date.now() - 1800000),
      status: 'delivered'
    }
  ]);

  const [timeline] = useState([
    {
      type: 'message',
      title: 'New Message',
      description: 'Sarah sent a message about project requirements',
      timestamp: '2 hours ago',
      actor: 'Sarah Chen'
    },
    {
      type: 'committed',
      title: 'Both Parties Committed',
      description: 'Exchange details are now visible to both parties',
      timestamp: '4 hours ago',
      actor: 'System'
    },
    {
      type: 'committed',
      title: 'Partner Committed',
      description: 'Sarah committed to the exchange',
      timestamp: '6 hours ago',
      actor: 'Sarah Chen'
    },
    {
      type: 'committed',
      title: 'You Committed',
      description: 'You committed to the exchange',
      timestamp: '6 hours ago',
      actor: 'Alex Johnson'
    },
    {
      type: 'matched',
      title: 'Exchange Matched',
      description: 'Successfully matched with Sarah Chen',
      timestamp: '1 day ago',
      actor: 'System'
    },
    {
      type: 'created',
      title: 'Exchange Created',
      description: 'Exchange request posted and active',
      timestamp: '2 days ago',
      actor: 'Alex Johnson'
    }
  ]);

  const isRevealed = exchangeData?.participants?.every(p => p?.commitmentStatus === 'committed');

  const handleBack = () => {
    navigate('/exchange-dashboard');
  };

  const handleMessage = () => {
    setShowMessageDialog(true);
  };

  const handleDispute = () => {
    setShowDisputeDialog(true);
  };

  const handleCommit = () => {
    setExchangeData(prev => ({
      ...prev,
      participants: prev?.participants?.map(p => 
        p?.id === currentUserId 
          ? { ...p, commitmentStatus: 'committed' }
          : p
      )
    }));
  };

  const handleCancel = () => {
    navigate('/exchange-dashboard');
  };

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages?.length + 1,
      senderId: currentUserId,
      senderName: 'Alex Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content,
      timestamp: new Date(),
      status: 'sent'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendFile = (file) => {
    const newMessage = {
      id: messages?.length + 1,
      senderId: currentUserId,
      senderName: 'Alex Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'file',
      fileName: file?.name,
      timestamp: new Date(),
      status: 'sent'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const exchangeTerms = {
    general: `Both parties agree to exchange the specified items/services as described. All exchanges are final once completed and confirmed by both parties. SecureSwap acts as a facilitator and is not responsible for the quality or condition of exchanged items.`,
    responsibilities: `Each party is responsible for accurately describing their offering, providing authentic items/services, and communicating clearly throughout the exchange process. Misrepresentation may result in account suspension.`
  };

  const exchangePolicies = {
    cancellation: `Exchanges can be cancelled before both parties commit. After mutual commitment, cancellation requires agreement from both parties or dispute resolution. Frequent cancellations may affect your reputation score.`,
    disputes: `If issues arise, parties should first attempt direct resolution through our messaging system. If unresolved, either party can initiate formal dispute resolution. Our team will review evidence and make a binding decision within 5-7 business days.`,
    privacy: `Personal information is only revealed after mutual commitment. We use encryption to protect all data and communications. Contact information is automatically hidden after exchange completion unless both parties agree to maintain contact.`
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <ExchangeHeader
          exchange={exchangeData}
          onBack={handleBack}
          onMessage={handleMessage}
          onDispute={handleDispute}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Indicator */}
              <ExchangeProgressIndicator
                currentStep={exchangeData?.currentStep}
                totalSteps={4}
                showLabels={true}
                size="default"
              />
              
              {/* Participants */}
              <ExchangeParticipants
                participants={exchangeData?.participants}
                currentUserId={currentUserId}
                isRevealed={isRevealed}
              />
              
              {/* Commitment Panel */}
              <CommitmentPanel
                exchange={exchangeData}
                currentUserId={currentUserId}
                onCommit={handleCommit}
                onCancel={handleCancel}
                isRevealed={isRevealed}
              />
              
              {/* Messaging Panel */}
              <MessagingPanel
                messages={messages}
                currentUserId={currentUserId}
                onSendMessage={handleSendMessage}
                onSendFile={handleSendFile}
              />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Timeline */}
              <ExchangeTimeline timeline={timeline} />
              
              {/* Terms & Policies */}
              <ExchangeTerms
                terms={exchangeTerms}
                policies={exchangePolicies}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExchangeDetails;