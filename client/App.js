import React from "react";

import Routes from "./Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";

import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E7ECEF",
    },
    secondary: {
      main: "#274C77",
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
