import { useEffect, useCallback } from 'react';

export default function useShortcut(keyboardMap, ignoreList = []) {
  const defaultIgnoreList = [
    'input',
    'select',
    'textarea',
    ...ignoreList,
  ];

  function handleKeyPress(e) {
    const target = e.target || e.srcElement;
    if (e.target) {
      const tagName = target.tagName.toLowerCase();
      if (defaultIgnoreList.indexOf(tagName) > -1) {
        return;
      }
    }

    if (keyboardMap[e.keyCode]) {
      keyboardMap[e.keyCode](e);
    }
  }

  const memoHandleKeyPress = useCallback(handleKeyPress, [keyboardMap]);

  useEffect(() => {
    document.addEventListener('keydown', memoHandleKeyPress);

    return () => document.removeEventListener('keydown', memoHandleKeyPress);
  }, [handleKeyPress]);
}
