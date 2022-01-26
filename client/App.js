import React from "react";

import Routes from "./Routes";

import Layout from "./components/Layout";

import { createTheme, ThemeProvider } from "@material-ui/core";

import { purple } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  }
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
