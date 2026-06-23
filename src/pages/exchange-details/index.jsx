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
import { useCurrency } from '../../contexts/CurrencyContext';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { getSession } from '../../utils/session';
import { getProfile } from '../../api/userApi';
import { getExchangeById, getMessages, addMessage, updateExchange } from '../../api/exchangeApi';
import { supabase } from '../../utils/supabaseClient';

const ExchangeDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exchangeId = searchParams?.get('id') || 'EX-2025-001';
  const { formatAmount } = useCurrency();

  const session = getSession();
  const currentUserId = session?.userId || '00000000-0000-0000-0000-000000000003';

  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showDisputeDialog, setShowDisputeDialog] = useState(false);
  const [exchangeData, setExchangeData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getExchangeById(exchangeId);
        if (!active) return;
        
        if (data) {
          const ownerProfile = await getProfile(data.owner_id);
          const partnerProfile = data.partner_id ? await getProfile(data.partner_id) : null;
          
          const formatted = {
            ...data,
            createdAt: new Date(data.created_at || Date.now()).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }),
            participants: [
              {
                id: ownerProfile.id,
                name: ownerProfile.display_name || 'Alex Johnson',
                avatar: ownerProfile.avatar_url,
                rating: ownerProfile.rating,
                completedExchanges: ownerProfile.completed_exchanges,
                location: ownerProfile.location,
                isVerified: ownerProfile.is_verified,
                isPremium: ownerProfile.is_premium,
                commitmentStatus: data.owner_committed ? 'committed' : 'pending',
                offering: {
                  title: data.title,
                  category: data.category || data.type,
                  value: data.value,
                  description: data.description,
                  conditions: data.conditions || 'None specified.'
                }
              },
              ...(partnerProfile ? [{
                id: partnerProfile.id,
                name: partnerProfile.display_name || 'Partner',
                avatar: partnerProfile.avatar_url,
                rating: partnerProfile.rating,
                completedExchanges: partnerProfile.completed_exchanges,
                location: partnerProfile.location,
                isVerified: partnerProfile.is_verified,
                isPremium: partnerProfile.is_premium,
                commitmentStatus: data.partner_committed ? 'committed' : 'pending',
                offering: {
                  title: data.wanted_type || 'Requested Item/Service',
                  category: data.wanted_category || '',
                  value: data.estimated_value || data.value,
                  description: data.wanted_description || 'No description provided.',
                  conditions: 'None specified.'
                }
              }] : [])
            ]
          };
          setExchangeData(formatted);
        }
        
        const msgs = await getMessages(exchangeId);
        if (active) {
          setMessages(msgs || []);
        }
      } catch (err) {
        console.error('Failed to load exchange details:', err);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadData();

    // Subscribe to realtime messages if Supabase is active
    let subscription = null;
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (url && !url.includes('dummy') && key && !key.includes('dummy')) {
      subscription = supabase
        .channel(`messages:exchange_id=eq.${exchangeId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `exchange_id=eq.${exchangeId}`
        }, (payload) => {
          setMessages(prev => {
            if (prev.some(m => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        })
        .subscribe();
    }

    return () => {
      active = false;
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [exchangeId]);

  const timeline = [
    ...(exchangeData?.participants?.some(p => p.commitmentStatus === 'committed') ? [
      {
        type: 'committed',
        title: 'Commitment Made',
        description: 'One or more parties have committed to the terms',
        timestamp: 'Recently',
        actor: 'Participant'
      }
    ] : []),
    ...(exchangeData?.partner_id ? [
      {
        type: 'matched',
        title: 'Exchange Matched',
        description: 'Successfully matched with a partner',
        timestamp: 'Recently',
        actor: 'System'
      }
    ] : []),
    {
      type: 'created',
      title: 'Exchange Created',
      description: 'Exchange request posted and active',
      timestamp: exchangeData?.createdAt || 'Recently',
      actor: 'System'
    }
  ];

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

  const handleCommit = async () => {
    try {
      const fieldToUpdate = exchangeData.owner_id === currentUserId ? 'owner_committed' : 'partner_committed';
      const updated = await updateExchange(exchangeId, { [fieldToUpdate]: true });
      if (updated) {
        setExchangeData(prev => ({
          ...prev,
          participants: prev?.participants?.map(p => 
            p?.id === currentUserId 
              ? { ...p, commitmentStatus: 'committed' }
              : p
          )
        }));
      }
    } catch (err) {
      console.error('Failed to commit:', err);
    }
  };

  const handleCancel = () => {
    navigate('/exchange-dashboard');
  };

  const handleSendMessage = async (content) => {
    try {
      const added = await addMessage(exchangeId, content);
      if (added) {
        setMessages(prev => {
          if (prev.some(m => m.id === added.id)) return prev;
          return [...prev, added];
        });
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleSendFile = async (file) => {
    try {
      const added = await addMessage(exchangeId, `Shared file: ${file.name}`, 'file');
      if (added) {
        setMessages(prev => {
          if (prev.some(m => m.id === added.id)) return prev;
          return [...prev, added];
        });
      }
    } catch (err) {
      console.error('Failed to send file message:', err);
    }
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

  if (loading || !exchangeData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center pt-32">
          <Icon name="Loader" className="animate-spin text-primary mb-2" size={32} />
          <p className="text-sm text-muted-foreground">Loading exchange details...</p>
        </div>
      </div>
    );
  }

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
      {/* Quick Message Modal */}
      {showMessageDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Send Quick Message</h3>
            <textarea
              id="quick-message-text"
              placeholder="Type your message..."
              className="w-full h-32 p-3 bg-muted border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  const val = document.getElementById('quick-message-text')?.value;
                  if (val?.trim()) {
                    handleSendMessage(val);
                    setShowMessageDialog(false);
                  }
                }}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* File Dispute Modal */}
      {showDisputeDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="AlertTriangle" size={24} />
              <h3 className="text-lg font-semibold text-foreground">File an Exchange Dispute</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to open a dispute? Our team will review all timeline logs, messaging records, and uploaded files to reach a resolution.
            </p>
            <textarea
              id="dispute-reason-text"
              placeholder="Describe your dispute in detail..."
              className="w-full h-32 p-3 bg-muted border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-destructive"
            />
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowDisputeDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  const val = document.getElementById('dispute-reason-text')?.value;
                  if (val?.trim()) {
                    setExchangeData(prev => ({ ...prev, status: 'disputed' }));
                    setShowDisputeDialog(false);
                  }
                }}
              >
                File Dispute
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeDetails;