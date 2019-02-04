import React, { createContext, useState } from 'react';

export const storeContext = createContext({});

export default function Provider({ children }) {
  // [TODO] extract store field or use getState
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
