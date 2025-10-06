import React, { createContext, useContext, useState, useEffect } from 'react';

// Default fallback rates in case API fails
const FALLBACK_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  CAD: 1.25,
  AUD: 1.35,
  INR: 74.5,
  CNY: 6.45,
  CHF: 0.91,
  SEK: 8.62,
  NZD: 1.42,
  MXN: 20.0,
  SGD: 1.35,
  HKD: 7.78,
  NOK: 8.85,
  KRW: 1180.0,
  TRY: 8.5,
  BRL: 5.2,
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
  CHF: 'Fr',
  SEK: 'kr',
  NZD: 'NZ$',
  MXN: '$',
  SGD: 'S$',
  HKD: 'HK$',
  NOK: 'kr',
  KRW: '₩',
  TRY: '₺',
  BRL: 'R$',
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
  const [currencyRates, setCurrencyRates] = useState(FALLBACK_RATES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch live currency rates from API
  const fetchCurrencyRates = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if we have cached rates less than 1 hour old
      const cachedRates = localStorage.getItem('currencyRates');
      const cachedTimestamp = localStorage.getItem('currencyRatesTimestamp');

      if (cachedRates && cachedTimestamp) {
        const cacheAge = Date.now() - parseInt(cachedTimestamp);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

        if (cacheAge < oneHour) {
          setCurrencyRates(JSON.parse(cachedRates));
          setIsLoading(false);
          return;
        }
      }

      // Fetch from API
      const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/exchange-api@1/latest/currencies/usd.json');

      if (!response.ok) {
        throw new Error('Failed to fetch currency rates');
      }

      const data = await response.json();

      // Extract rates for supported currencies
      const newRates = {
        USD: 1,
        EUR: data.usd.eur || FALLBACK_RATES.EUR,
        GBP: data.usd.gbp || FALLBACK_RATES.GBP,
        JPY: data.usd.jpy || FALLBACK_RATES.JPY,
        CAD: data.usd.cad || FALLBACK_RATES.CAD,
        AUD: data.usd.aud || FALLBACK_RATES.AUD,
        INR: data.usd.inr || FALLBACK_RATES.INR,
        CNY: data.usd.cny || FALLBACK_RATES.CNY,
        CHF: data.usd.chf || FALLBACK_RATES.CHF,
        SEK: data.usd.sek || FALLBACK_RATES.SEK,
        NZD: data.usd.nzd || FALLBACK_RATES.NZD,
        MXN: data.usd.mxn || FALLBACK_RATES.MXN,
        SGD: data.usd.sgd || FALLBACK_RATES.SGD,
        HKD: data.usd.hkd || FALLBACK_RATES.HKD,
        NOK: data.usd.nok || FALLBACK_RATES.NOK,
      };

      setCurrencyRates(newRates);

      // Cache the rates
      localStorage.setItem('currencyRates', JSON.stringify(newRates));
      localStorage.setItem('currencyRatesTimestamp', Date.now().toString());

    } catch (err) {
      console.error('Error fetching currency rates:', err);
      setError(err.message);
      // Use fallback rates if API fails
      setCurrencyRates(FALLBACK_RATES);
    } finally {
      setIsLoading(false);
    }
  };

  // Load currency preference and fetch rates on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('userCurrency');
    if (savedCurrency && FALLBACK_RATES[savedCurrency]) {
      setCurrency(savedCurrency);
    }

    fetchCurrencyRates();
  }, []);

  // Save currency to localStorage when changed
  const changeCurrency = (newCurrency) => {
    if (currencyRates[newCurrency]) {
      setCurrency(newCurrency);
      localStorage.setItem('userCurrency', newCurrency);
    }
  };

  // Convert amount from USD to selected currency
  const convertAmount = (amount, fromCurrency = 'USD') => {
    if (typeof amount !== 'number') return amount;

    // Convert to USD first if not already
    const usdAmount = fromCurrency === 'USD' ? amount : amount / currencyRates[fromCurrency];

    // Convert to selected currency
    return usdAmount * currencyRates[currency];
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
    currencies: Object.keys(currencyRates),
    currencySymbols: CURRENCY_SYMBOLS,
    currencyRates,
    isLoading,
    error,
    changeCurrency,
    convertAmount,
    formatAmount,
    refreshRates: fetchCurrencyRates,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
