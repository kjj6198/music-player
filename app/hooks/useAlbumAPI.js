import { useEffect } from 'react';
import { getAlbumByID, getAllAlbums } from '@/apis/albums';
import useStore from './useStore';

export default function useAlbumAPI(id) {
  const store = useStore();
  useEffect(() => {
    store.setStore({ loaded: false });
    const abortController = new AbortController();
    const { signal } = abortController;
    if (id) {
      getAlbumByID(id, signal)
        .then(res => res.json())
        .then(album => store.setStore({
          albums: [album],
        }));
    } else {
      getAllAlbums()
        .then(res => res.json())
        .then(albums => store.setStore({ albums }));
    }
    return () => abortController.abort();
  }, [id]);

  return store;
}
