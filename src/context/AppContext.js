import React from 'react';

export const AppContext = React.createContext({
  user: null,
});

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
