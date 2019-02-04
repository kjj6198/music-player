import React, { createContext, createRef, useState, memo } from 'react';

const initialState = {
  audio: null,
  audioRef: createRef(null),
  setContext: null,
};
export const playerContext = createContext(initialState);

function AudioProvider({ children }) {
  const [state, setState] = useState(initialState);

  return (
    <playerContext.Provider
      value={{
        ...state,
        setContext: ({ audioRef, audio }) => setState({
          audioRef,
          audio,
        }),
      }}
    >
      {children}
    </playerContext.Provider>
  );
}

export default memo(AudioProvider);

export const withAudioContext = WrappedComponent => props => (
  <playerContext.Consumer>
    {({ audioRef, audio, setContext }) => (
      <WrappedComponent audioRef={audioRef} audio={audio} setContext={setContext} {...props} />
    )}
  </playerContext.Consumer>
);
