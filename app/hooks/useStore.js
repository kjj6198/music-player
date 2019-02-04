import { useContext } from 'react';
import { storeContext } from '@/containers/Provider';

export default function useStore() {
  const store = useContext(storeContext);
  return store;
}
