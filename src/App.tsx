import { ThemeProvider } from '@material-ui/core'
import HeaderBar from 'components/HeaderBar'
import { AppContainer } from 'containers/AppContainer'
import { LoadingContextProvider } from 'contexts/LoadingContextProvider'
import Dashboard from 'pages/Dashboard'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import customTheme from 'styles/customMuiTheme'

const App: React.FC = _ => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppContainer>
              <LoadingContextProvider>
                <ThemeProvider theme={customTheme}>
                  <HeaderBar />
                  <Dashboard />
                </ThemeProvider>
              </LoadingContextProvider>
            </AppContainer>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
