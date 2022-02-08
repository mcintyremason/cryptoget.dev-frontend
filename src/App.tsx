import { ThemeProvider } from '@material-ui/core'
import { AppContainer } from 'containers/AppContainer'
import Balances from 'pages/Balances'
import Dashboard from 'pages/Dashboard'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import customTheme from 'styles/customMuiTheme'

const App: React.FC = _ => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/home"
          render={_ => (
            <AppContainer>
              <ThemeProvider theme={customTheme}>
                <Dashboard />
              </ThemeProvider>
            </AppContainer>
          )}
        />
        <Route
          path="/balances"
          render={_ => (
            <AppContainer>
              <ThemeProvider theme={customTheme}>
                <Balances />
              </ThemeProvider>
            </AppContainer>
          )}
        />
        <Route
          path="*"
          render={_ => {
            return <Redirect to="/home" />
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App
