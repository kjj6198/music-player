import React, { createContext, createRef, useState } from 'react';

const initialState = {
  audio: null,
  audioRef: createRef(null),
  setContext: null,
};
export const playerContext = createContext(initialState);

export default function AudioProvider({ children }) {
  const [state, setState] = useState(initialState);

  return (
    <playerContext.Provider
      value={{
        ...state,
        setState,
      }}
    >
      {children}
    </playerContext.Provider>
  );
}
