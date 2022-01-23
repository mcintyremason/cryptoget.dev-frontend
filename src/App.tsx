import { AppContainer } from "containers/AppContainer";
import Dashboard from "pages/Dashboard";
import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App: React.FC = (_) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppContainer>
              <Dashboard />
            </AppContainer>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
