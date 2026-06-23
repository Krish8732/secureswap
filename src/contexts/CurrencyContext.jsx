import React, { createContext, useContext, useEffect, useState } from 'react';

// Default fallback rates in case the public feed is unavailable.
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
  EUR: '\u20AC',
  GBP: '\u00A3',
  JPY: '\u00A5',
  CAD: 'C$',
  AUD: 'A$',
  INR: '\u20B9',
  CNY: '\u00A5',
  CHF: 'Fr',
  SEK: 'kr',
  NZD: 'NZ$',
  MXN: '$',
  SGD: 'S$',
  HKD: 'HK$',
  NOK: 'kr',
  KRW: '\u20A9',
  TRY: '\u20BA',
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

  const fetchCurrencyRates = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const cachedRates = localStorage.getItem('currencyRates');
      const cachedTimestamp = localStorage.getItem('currencyRatesTimestamp');

      if (cachedRates && cachedTimestamp) {
        const cacheAge = Date.now() - parseInt(cachedTimestamp, 10);
        const oneHour = 60 * 60 * 1000;

        if (cacheAge < oneHour) {
          setCurrencyRates(JSON.parse(cachedRates));
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/exchange-api@1/latest/currencies/usd.json');

      if (!response.ok) {
        throw new Error('Failed to fetch currency rates');
      }

      const data = await response.json();
      const usdRates = data?.usd;

      if (!usdRates) {
        throw new Error('Currency feed returned an unexpected response');
      }

      const newRates = {
        USD: 1,
        EUR: usdRates?.eur || FALLBACK_RATES.EUR,
        GBP: usdRates?.gbp || FALLBACK_RATES.GBP,
        JPY: usdRates?.jpy || FALLBACK_RATES.JPY,
        CAD: usdRates?.cad || FALLBACK_RATES.CAD,
        AUD: usdRates?.aud || FALLBACK_RATES.AUD,
        INR: usdRates?.inr || FALLBACK_RATES.INR,
        CNY: usdRates?.cny || FALLBACK_RATES.CNY,
        CHF: usdRates?.chf || FALLBACK_RATES.CHF,
        SEK: usdRates?.sek || FALLBACK_RATES.SEK,
        NZD: usdRates?.nzd || FALLBACK_RATES.NZD,
        MXN: usdRates?.mxn || FALLBACK_RATES.MXN,
        SGD: usdRates?.sgd || FALLBACK_RATES.SGD,
        HKD: usdRates?.hkd || FALLBACK_RATES.HKD,
        NOK: usdRates?.nok || FALLBACK_RATES.NOK,
      };

      setCurrencyRates(newRates);
      localStorage.setItem('currencyRates', JSON.stringify(newRates));
      localStorage.setItem('currencyRatesTimestamp', Date.now().toString());
    } catch (err) {
      console.error('Error fetching currency rates:', err);
      setError(err.message);
      setCurrencyRates(FALLBACK_RATES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedCurrency = localStorage.getItem('userCurrency');
    if (savedCurrency && FALLBACK_RATES[savedCurrency]) {
      setCurrency(savedCurrency);
    }

    fetchCurrencyRates();
  }, []);

  const changeCurrency = (newCurrency) => {
    if (currencyRates[newCurrency]) {
      setCurrency(newCurrency);
      localStorage.setItem('userCurrency', newCurrency);
    }
  };

  const convertAmount = (amount, fromCurrency = 'USD') => {
    if (typeof amount !== 'number') return amount;

    const usdAmount = fromCurrency === 'USD' ? amount : amount / currencyRates[fromCurrency];
    return usdAmount * currencyRates[currency];
  };

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
