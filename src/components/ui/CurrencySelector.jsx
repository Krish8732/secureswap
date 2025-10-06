import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';

const CurrencySelector = () => {
  const { currency, currencies, changeCurrency } = useCurrency();

  const handleChange = (e) => {
    changeCurrency(e.target.value);
  };

  return (
    <select
      value={currency}
      onChange={handleChange}
      aria-label="Select currency"
      className="bg-card border border-border rounded-md px-2 py-1 text-sm"
    >
      {currencies.map((cur) => (
        <option key={cur} value={cur}>
          {cur}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
