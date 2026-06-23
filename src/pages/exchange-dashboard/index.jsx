import React, { useState } from 'react';
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
import { getSession } from '../../utils/session';
import { useExchanges } from '../../hooks/useExchanges';

const ExchangeDashboard = () => {
  const session = getSession();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedExchangeId, setSelectedExchangeId] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    category: 'all',
    status: 'all',
    sortBy: 'recent'
  });

  const { exchanges = [], loading } = useExchanges();

  const statsData = [
    {
      title: 'Active Exchanges',
      value: String(exchanges?.filter(e => e?.status === 'active')?.length || 0),
      change: '+14%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'primary'
    },
    {
      title: 'Success Rate',
      value: '98.4%',
      change: '+1.2%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Escrow Volume',
      value: `$${(exchanges?.reduce((sum, e) => sum + (parseFloat(e?.value) || 0), 0) || 0).toLocaleString()}`,
      change: '+$8.5k',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'secondary'
    },
    {
      title: 'Disputes',
      value: '0',
      change: '-2',
      changeType: 'positive',
      icon: 'Shield',
      color: 'muted'
    }
  ];

  const filteredExchanges = exchanges
    .filter(exchange => {
      if (activeTab !== 'all' && exchange.status !== activeTab) return false;
      if (searchFilters.category !== 'all' && exchange.type !== searchFilters.category) return false;
      if (searchFilters.status !== 'all' && exchange.status !== searchFilters.status) return false;
      if (searchFilters.query) {
        const q = searchFilters.query.toLowerCase();
        return exchange.title?.toLowerCase().includes(q) || exchange.description?.toLowerCase().includes(q);
      }
      return true;
    });

  const selectedExchange = exchanges.find(e => e.id === selectedExchangeId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-24 pb-12">
        <DashboardNavPanel 
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
          searchQuery={searchFilters?.query}
          onSearchQueryChange={(query) => setSearchFilters(prev => ({ ...prev, query }))}
        />
        
        <main className="flex-1 px-8 overflow-x-hidden">
          {/* Executive Header */}
          <div className="flex items-end justify-between mb-10 animate-fade-up">
            <div>
              <p className="text-sm font-semibold tracking-wider text-primary uppercase mb-2">Executive Overview</p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Welcome back, {session?.email?.split('@')[0] || 'Operator'}.
              </h1>
            </div>
            <Link to="/create-exchange">
              <Button variant="default" iconName="ArrowRight" iconPosition="right">
                New Escrow Protocol
              </Button>
            </Link>
          </div>

          {/* KPI Dashboard: Asymmetrical Bento Grid */}
          <div className="grid grid-cols-12 gap-6 mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
            {/* KPI Row */}
            <div className="col-span-12 lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, i) => (
                <div key={i} className="doppelrand-shell">
                  <div className="doppelrand-core p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-xl bg-${stat.color}/10 text-${stat.color}`}>
                        <Icon name={stat.icon} size={20} strokeWidth={1.5} />
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.changeType === 'positive' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-semibold text-foreground tracking-tight">{stat.value}</h3>
                      <p className="text-sm text-text-secondary mt-1">{stat.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Bento */}
            <div className="col-span-12 lg:col-span-4">
              <div className="doppelrand-shell h-full">
                <div className="doppelrand-core p-6 h-full">
                  <QuickActions />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area - Split Panel Architecture */}
          <div className="grid grid-cols-12 gap-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
            
            {/* Left Column (Table/List) */}
            <div className={`transition-all duration-fluid ease-fluid col-span-12 ${selectedExchangeId ? 'lg:col-span-7' : 'lg:col-span-8'}`}>
              <div className="doppelrand-shell h-[800px]">
                <div className="doppelrand-core p-0 h-full flex flex-col overflow-hidden">
                  {/* Header & Tabs */}
                  <div className="p-6 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-foreground">Active Protocols</h2>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" iconName="Filter">Filter</Button>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {['all', 'active', 'pending', 'completed'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-fluid ${
                            activeTab === tab
                              ? 'bg-primary text-primary-foreground shadow-diffusion'
                              : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'
                          }`}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* List Body */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {loading ? (
                      <div className="flex justify-center items-center h-full">
                        <Icon name="Loader" className="animate-spin text-primary" size={32} />
                      </div>
                    ) : filteredExchanges.map(exchange => (
                      <div 
                        key={exchange.id} 
                        onClick={() => setSelectedExchangeId(exchange.id === selectedExchangeId ? null : exchange.id)}
                        className={`cursor-pointer transition-all duration-fluid rounded-2xl ${selectedExchangeId === exchange.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                      >
                        <ExchangeCard exchange={exchange} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Details Panel OR Sidebar Widgets) */}
            <div className={`transition-all duration-fluid ease-fluid col-span-12 ${selectedExchangeId ? 'lg:col-span-5' : 'lg:col-span-4'}`}>
              {selectedExchangeId ? (
                /* Split-Panel Detail View */
                <div className="doppelrand-shell h-[800px] animate-fade-in">
                  <div className="doppelrand-core p-6 h-full overflow-y-auto relative">
                    <button 
                      onClick={() => setSelectedExchangeId(null)}
                      className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors"
                    >
                      <Icon name="X" size={16} />
                    </button>
                    
                    <div className="mb-8 mt-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold tracking-wider uppercase">
                        Protocol #{selectedExchange.id}
                      </span>
                      <h2 className="text-2xl font-bold mt-4 mb-2">{selectedExchange.title}</h2>
                      <p className="text-text-secondary leading-relaxed">{selectedExchange.description}</p>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                        <p className="text-sm text-text-secondary mb-1">Escrow Value</p>
                        <p className="text-3xl font-semibold">${selectedExchange.value.toLocaleString()}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4 flex items-center"><Icon name="User" size={16} className="mr-2"/> Counterparty</h3>
                        <div className="flex items-center space-x-4 p-4 rounded-2xl border border-border">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {selectedExchange.partner?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-medium">{selectedExchange.partner?.name || 'Unknown'}</p>
                            <p className="text-sm text-text-secondary">Trust Score: {selectedExchange.partner?.rating || 'N/A'}/5</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <Link to={`/exchange-details/${selectedExchange.id}`} className="block w-full">
                          <Button variant="default" fullWidth iconName="ArrowRight" iconPosition="right">
                            Enter Negotiation Room
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Default Sidebar Widgets */
                <div className="space-y-6 animate-fade-in">
                  <div className="doppelrand-shell">
                    <div className="doppelrand-core p-6">
                      <TrustScoreWidget />
                    </div>
                  </div>
                  <div className="doppelrand-shell">
                    <div className="doppelrand-core p-6">
                      <NotificationCenter />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ExchangeDashboard;