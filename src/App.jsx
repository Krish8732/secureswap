import React from "react";
import Routes from "./Routes";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Routes />
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
