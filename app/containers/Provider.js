import React, { createContext, useState } from 'react';

export const storeContext = createContext({});

export default function Provider({ children }) {
  const [store, setStore] = useState({});

  return (
    <storeContext.Provider
      value={{
        store,
        setStore,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}
