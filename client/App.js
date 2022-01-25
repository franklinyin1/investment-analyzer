import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'

import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
