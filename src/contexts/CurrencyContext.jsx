import React, { createContext, useContext, useState, useEffect } from 'react';

// Currency conversion rates (base: USD)
const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  CAD: 1.25,
  AUD: 1.35,
  INR: 74.5,
  CNY: 6.45,
};

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  INR: '₹',
  CNY: '¥',
};

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('userCurrency');
    if (savedCurrency && CURRENCY_RATES[savedCurrency]) {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save currency to localStorage when changed
  const changeCurrency = (newCurrency) => {
    if (CURRENCY_RATES[newCurrency]) {
      setCurrency(newCurrency);
      localStorage.setItem('userCurrency', newCurrency);
    }
  };

  // Convert amount from USD to selected currency
  const convertAmount = (amount, fromCurrency = 'USD') => {
    if (typeof amount !== 'number') return amount;

    // Convert to USD first if not already
    const usdAmount = fromCurrency === 'USD' ? amount : amount / CURRENCY_RATES[fromCurrency];

    // Convert to selected currency
    return usdAmount * CURRENCY_RATES[currency];
  };

  // Format amount with currency symbol
  const formatAmount = (amount, fromCurrency = 'USD', showSymbol = true) => {
    if (typeof amount !== 'number') return amount;

    const convertedAmount = convertAmount(amount, fromCurrency);

    if (showSymbol) {
      return `${CURRENCY_SYMBOLS[currency]}${convertedAmount.toFixed(2)}`;
    }

    return convertedAmount.toFixed(2);
  };

  const value = {
    currency,
    currencies: Object.keys(CURRENCY_RATES),
    currencySymbols: CURRENCY_SYMBOLS,
    changeCurrency,
    convertAmount,
    formatAmount,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
