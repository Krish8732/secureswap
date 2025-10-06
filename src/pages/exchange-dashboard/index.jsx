import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import DashboardNavPanel from '../../components/ui/DashboardNavPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ExchangeCard from './components/ExchangeCard';
import StatsCard from './components/StatsCard';
import NotificationCenter from './components/NotificationCenter';
import QuickActions from './components/QuickActions';
import SearchFilters from './components/SearchFilters';
import TrustScoreWidget from './components/TrustScoreWidget';

const ExchangeDashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for exchanges
  const mockExchanges = [
    {
      id: 1,
      title: 'Web Development Service',
      type: 'service',
      status: 'active',
      progress: 75,
      value: 850,
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      description: 'Looking to exchange web development services for graphic design work',
      partner: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        rating: 4.8
      },
      hasNewMessage: true,
      nextAction: 'Review Terms'
    },
    {
      id: 2,
      title: 'Amazon Gift Card Exchange',
      type: 'gift_card',
      status: 'pending',
      progress: 25,
      value: 200,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      description: '$200 Amazon gift card for equivalent iTunes gift card',
      partner: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        rating: 4.6
      },
      hasNewMessage: false,
      nextAction: 'Upload Card'
    },
    {
      id: 3,
      title: 'MacBook Pro Exchange',
      type: 'product',
      status: 'completed',
      progress: 100,
      value: 1200,
      deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      description: '2021 MacBook Pro for equivalent Windows laptop + cash difference',
      partner: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        rating: 4.9
      },
      hasNewMessage: false,
      nextAction: 'Rate Partner'
    },
    {
      id: 4,
      title: 'Photography Services',
      type: 'service',
      status: 'active',
      progress: 40,
      value: 600,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: 'Wedding photography in exchange for video editing services',
      partner: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        rating: 4.7
      },
      hasNewMessage: true,
      nextAction: 'Schedule Meeting'
    }
  ];

  // Mock stats data
  const statsData = [
    {
      title: 'Active Exchanges',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: 'Activity',
      color: 'primary'
    },
    {
      title: 'Completed This Month',
      value: '12',
      change: '+4',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Total Exchange Value',
      value: '$4,250',
      change: '+$850',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'secondary'
    },
    {
      title: 'Pending Reviews',
      value: '3',
      change: '-1',
      changeType: 'negative',
      icon: 'Star',
      color: 'warning'
    }
  ];

  const filteredExchanges = activeTab === 'all' 
    ? mockExchanges 
    : mockExchanges?.filter(exchange => exchange?.status === activeTab);

  const handleSearch = (filters) => {
    console.log('Search filters:', filters);
    // Implement search logic here
  };

  const handleFilterChange = (filters) => {
    console.log('Filter change:', filters);
    // Implement filter logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        <DashboardNavPanel 
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
                <p className="text-muted-foreground">
                  You have {mockExchanges?.filter(e => e?.status === 'active')?.length} active exchanges and {mockExchanges?.filter(e => e?.hasNewMessage)?.length} new messages
                </p>
              </div>
              <Link to="/create-exchange">
                <Button variant="default" size="lg" iconName="Plus" iconPosition="left">
                  Create New Exchange
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData?.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Search & Filters */}
            <div className="lg:col-span-2">
              <SearchFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActions />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Exchange Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Exchange Tabs */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Your Exchanges</h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Filter">
                      Filter
                    </Button>
                    <Button variant="ghost" size="sm" iconName="ArrowUpDown">
                      Sort
                    </Button>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
                  {[
                    { key: 'all', label: 'All', count: mockExchanges?.length },
                    { key: 'active', label: 'Active', count: mockExchanges?.filter(e => e?.status === 'active')?.length },
                    { key: 'pending', label: 'Pending', count: mockExchanges?.filter(e => e?.status === 'pending')?.length },
                    { key: 'completed', label: 'Completed', count: mockExchanges?.filter(e => e?.status === 'completed')?.length }
                  ]?.map((tab) => (
                    <button
                      key={tab?.key}
                      onClick={() => setActiveTab(tab?.key)}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
                        activeTab === tab?.key
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab?.label} ({tab?.count})
                    </button>
                  ))}
                </div>

                {/* Exchange Cards */}
                <div className="space-y-4">
                  {filteredExchanges?.length > 0 ? (
                    filteredExchanges?.map((exchange) => (
                      <ExchangeCard key={exchange?.id} exchange={exchange} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="ArrowLeftRight" size={48} color="var(--color-muted-foreground)" />
                      <h3 className="text-lg font-medium text-foreground mt-4">No exchanges found</h3>
                      <p className="text-muted-foreground mb-6">
                        {activeTab === 'all' ? "You haven't created any exchanges yet" 
                          : `No ${activeTab} exchanges at the moment`}
                      </p>
                      <Link to="/create-exchange">
                        <Button variant="default" iconName="Plus" iconPosition="left">
                          Create Your First Exchange
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trust Score Widget */}
              <TrustScoreWidget />
              
              {/* Notifications */}
              <NotificationCenter />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExchangeDashboard;