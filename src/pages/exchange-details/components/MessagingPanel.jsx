import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MessagingPanel = ({ messages, currentUserId, onSendMessage, onSendFile }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
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
    const isCurrentUser = message?.senderId === currentUserId;
    
    return (
      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
          {!isCurrentUser && (
            <div className="flex items-center space-x-2 mb-1">
              <Image
                src={message?.senderAvatar}
                alt={message?.senderName}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs text-muted-foreground">{message?.senderName}</span>
            </div>
          )}
          
          <div className={`rounded-lg px-4 py-2 ${
            isCurrentUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-foreground'
          }`}>
            {message?.type === 'text' && (
              <p className="text-sm">{message?.content}</p>
            )}
            
            {message?.type === 'file' && (
              <div className="flex items-center space-x-2">
                <Icon name="Paperclip" size={16} />
                <span className="text-sm">{message?.fileName}</span>
                <Button variant="ghost" size="xs">
                  <Icon name="Download" size={14} />
                </Button>
              </div>
            )}
            
            {message?.type === 'image' && (
              <div>
                <Image
                  src={message?.imageUrl}
                  alt="Shared image"
                  className="rounded-lg max-w-full h-auto mb-2"
                />
                {message?.caption && (
                  <p className="text-sm">{message?.caption}</p>
                )}
              </div>
            )}
          </div>
          
          <div className={`text-xs text-muted-foreground mt-1 ${
            isCurrentUser ? 'text-right' : 'text-left'
          }`}>
            {formatTime(message?.timestamp)}
            {isCurrentUser && message?.status && (
              <span className="ml-2">
                {message?.status === 'sent' && <Icon name="Check" size={12} />}
                {message?.status === 'delivered' && <Icon name="CheckCheck" size={12} />}
                {message?.status === 'read' && <Icon name="CheckCheck" size={12} color="var(--color-primary)" />}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div 
        className="p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-smooth"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Messages</h3>
              <p className="text-sm text-muted-foreground">
                {messages?.length} messages
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {messages?.some(m => m?.senderId !== currentUserId && !m?.read) && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              color="var(--color-muted-foreground)"
            />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4">
          <div className="h-64 overflow-y-auto mb-4 space-y-2">
            {messages?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Icon name="MessageSquare" size={48} color="var(--color-muted-foreground)" />
                <p className="text-muted-foreground mt-2">No messages yet</p>
                <p className="text-sm text-muted-foreground">Start a conversation with your exchange partner</p>
              </div>
            ) : (
              messages?.map((message) => (
                <MessageBubble key={message?.id} message={message} />
              ))
            )}
          </div>
          
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e?.target?.value)}
                onKeyPress={handleKeyPress}
                className="resize-none"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => document.getElementById('file-upload')?.click()}
              className="shrink-0"
            >
              <Icon name="Paperclip" size={20} />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage?.trim()}
              className="shrink-0"
            >
              <Icon name="Send" size={20} />
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
      )}
    </div>
  );
};

export default MessagingPanel;