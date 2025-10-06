# Currency Change Feature Implementation

## Overview
Add a global currency change option so users from around the world can use the app. The currency selector will be available on every page, and users will see amounts in their selected currency.

## Steps
- [x] Create CurrencyContext for global currency state management
- [x] Create CurrencySelector component (dropdown)
- [x] Add CurrencySelector to Header component
- [x] Wrap app with CurrencyContext provider
- [x] Update currency display in ExchangeDetails page
- [x] Update currency display in CreateExchange page
- [x] Add currency conversion logic
- [x] Persist user currency preference in localStorage
- [x] Integrate live currency rates API (fawazahmed0/exchange-api)
- [x] Add caching and fallback rates for API failures
- [x] Add loading and error states for API calls
- [ ] Test currency switching functionality

## Files to Create/Modify
- src/contexts/CurrencyContext.jsx (new)
- src/components/ui/CurrencySelector.jsx (new)
- src/components/ui/Header.jsx (modify)
- src/App.jsx (modify)
- src/pages/exchange-details/index.jsx (modify)
- src/pages/create-exchange/index.jsx (modify)
- src/utils/currency.js (new - for conversion logic)

## Notes
- Base currency is USD
- Support common currencies: USD, EUR, GBP, JPY, CAD, AUD
- Use static conversion rates for simplicity (can be updated to use API later)
- Persist preference in localStorage with key 'userCurrency'
