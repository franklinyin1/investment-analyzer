import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

import Layout from "./components/Layout";

import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Navbar />
        <Routes />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
