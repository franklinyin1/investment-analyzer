import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
