import React, { createContext } from 'react'

type AppContainerProps = {
  children: React.ReactElement[] | React.ReactElement
}

export type AppContextType = {}

export const AppContext = createContext<AppContextType>({})

const AppContainer: React.FC<AppContainerProps> = props => {
  const appContextValue = {}

  return <AppContext.Provider value={appContextValue}>{props.children}</AppContext.Provider>
}

export default AppContainer
