import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'exchange_update',
      title: 'Exchange Update',
      message: 'Sarah Johnson has accepted your service exchange proposal',
      timestamp: new Date(Date.now() - 300000),
      read: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      actionRequired: true
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from Mike Chen regarding the gift card exchange',
      timestamp: new Date(Date.now() - 900000),
      read: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      actionRequired: false
    },
    {
      id: 3,
      type: 'system',
      title: 'Security Alert',
      message: 'Your account security score has increased to 95%',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      avatar: null,
      actionRequired: false
    },
    {
      id: 4,
      type: 'exchange_complete',
      title: 'Exchange Completed',
      message: 'Your product exchange with Alex Rodriguez has been completed successfully',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      actionRequired: false
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'exchange_update':
        return 'ArrowLeftRight';
      case 'message':
        return 'MessageSquare';
      case 'system':
        return 'Shield';
      case 'exchange_complete':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'exchange_update':
        return 'var(--color-primary)';
      case 'message':
        return 'var(--color-secondary)';
      case 'system':
        return 'var(--color-warning)';
      case 'exchange_complete':
        return 'var(--color-success)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffMinutes / 1440)}d ago`;
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} color="var(--color-foreground)" />
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-smooth cursor-pointer ${
              !notification?.read ? 'bg-primary/5' : ''
            }`}
            onClick={() => markAsRead(notification?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {notification?.avatar ? (
                  <Image
                    src={notification?.avatar}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Icon
                      name={getNotificationIcon(notification?.type)}
                      size={20}
                      color={getNotificationColor(notification?.type)}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(notification?.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {notification?.message}
                </p>
                {notification?.actionRequired && (
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Take Action
                    </Button>
                  </div>
                )}
              </div>

              {!notification?.read && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" fullWidth>
          View All Notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationCenter;