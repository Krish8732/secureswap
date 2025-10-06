import React from "react";
import Routes from "./Routes";
import { CurrencyProvider } from "./contexts/CurrencyContext";

function App() {
  return (
    <CurrencyProvider>
      <Routes />
    </CurrencyProvider>
  );
}

export default App;
