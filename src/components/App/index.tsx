import React from 'react'
import { ThemeProvider } from 'styled-components/macro'
import { BrowserRouter as Router } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import 'rpg-awesome/css/rpg-awesome.min.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import { mainTheme, muiTheme } from '../../mainTheme'

import MainApp from './MainApp'
import Wrapper from './Wrapper'

const App = () => {
  // Remount the app when the UI language changes so every text is re-translated.
  const { i18n } = useTranslation()

  return (
    <ThemeProvider theme={mainTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <Router basename={process.env.PUBLIC_URL}>
          <Wrapper key={i18n.language}>
            <CssBaseline />
            <MainApp />
          </Wrapper>
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

export default React.memo(App)
