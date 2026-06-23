import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MessagingPanel = ({ messages, currentUserId, onSendMessage, onSendFile }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (isExpanded) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded]);

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const MessageBubble = ({ message }) => {
    const isCurrentUser = message?.sender_id === currentUserId || message?.senderId === currentUserId;
    const msgText = message?.text || message?.content || '';
    const msgTime = message?.created_at || message?.timestamp || new Date().toISOString();
    
    return (
      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-up`} style={{ animationDuration: '400ms' }}>
        <div className={`max-w-[85%] lg:max-w-[70%] flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
          
          {!isCurrentUser && (
            <div className="flex items-center space-x-2 mb-2 ml-1">
              <div className="relative">
                <Image
                  src={message?.senderAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                  alt={message?.senderName || 'Partner'}
                  className="w-8 h-8 rounded-full object-cover shadow-sm"
                />
                {/* Perpetual Micro-Animation: Breathing Status Dot */}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-card animate-[pulse-slow_2s_ease-in-out_infinite]" />
              </div>
              <span className="text-xs font-semibold text-text-secondary tracking-wide">{message?.senderName || 'Partner'}</span>
            </div>
          )}
          
          <div className={`rounded-[1.5rem] px-5 py-3.5 shadow-sm ${
            isCurrentUser 
               ? 'bg-primary text-primary-foreground rounded-br-sm' 
               : 'bg-card border border-border text-foreground rounded-bl-sm'
          }`}>
            <p className="text-[15px] leading-relaxed">{msgText}</p>
          </div>
          
          <div className="text-[11px] font-medium text-text-secondary mt-1.5 px-2 flex items-center space-x-1">
            <span>{formatTime(msgTime)}</span>
            {isCurrentUser && (
              <span className="ml-1 text-primary">
                <Icon name="Check" size={14} />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="doppelrand-shell">
      <div className="doppelrand-core flex flex-col overflow-hidden">
        <div 
          className="p-5 border-b border-border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-fluid group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-[1.25rem] flex items-center justify-center group-hover:scale-105 transition-transform duration-fluid">
                <Icon name="MessageSquare" size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Secure Negotiation</h3>
                <p className="text-xs font-medium text-text-secondary tracking-wide uppercase mt-0.5">
                  End-to-End Encrypted • {messages?.length} Messages
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {messages?.some(m => m?.senderId !== currentUserId && !m?.read) && (
                <div className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </div>
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 transition-transform duration-fluid ${isExpanded ? 'rotate-180' : ''}`}>
                <Icon name="ChevronDown" size={18} className="text-text-secondary" />
              </div>
            </div>
          </div>
        </div>
        
        <div className={`transition-all duration-fluid ease-fluid overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="h-[400px] overflow-y-auto p-6 scroll-smooth">
              {messages?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
                  <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
                    <Icon name="Shield" size={24} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-base font-semibold text-foreground">Chat is Secure</h4>
                  <p className="text-sm text-text-secondary mt-1 max-w-[250px]">
                    All messages and files shared here are encrypted and confidential.
                  </p>
                </div>
              ) : (
                messages?.map((message) => (
                  <MessageBubble key={message?.id} message={message} />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 bg-card border-t border-border">
              <div className="flex items-end space-x-3 bg-black/5 dark:bg-white/5 p-2 rounded-[2rem] border border-border">
                <button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-text-secondary hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground transition-colors"
                >
                  <Icon name="Paperclip" size={20} strokeWidth={1.5} />
                </button>
                
                <textarea
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e?.target?.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-0 outline-none resize-none max-h-32 min-h-[40px] py-2.5 text-[15px] focus:ring-0 text-foreground placeholder:text-text-secondary"
                  rows={1}
                />
                
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!newMessage?.trim()}
                  className="shrink-0 w-10 h-10 rounded-full rounded-r-full"
                >
                  <Icon name="Send" size={18} strokeWidth={2} className="ml-0.5" />
                </Button>
              </div>
              
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e?.target?.files?.[0]) {
                    onSendFile(e?.target?.files?.[0]);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPanel;