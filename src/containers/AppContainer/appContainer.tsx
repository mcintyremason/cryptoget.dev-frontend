import React, { createContext, useState } from "react";

type AppContainerProps = {
  children: React.ReactElement[] | React.ReactElement;
};

export type AppContextType = {};

export const AppContext = createContext<AppContextType>(null);

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const appContextValue = {};

  return (
    <AppContext.Provider value={appContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContainer;