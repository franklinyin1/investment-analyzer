import React from "react";

import Routes from "./Routes";
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
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes />
        </Layout>
      </ThemeProvider>
  );
}

export default App;
