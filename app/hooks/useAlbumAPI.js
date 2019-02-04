import { useEffect } from 'react';
import { getAlbumByID, getAllAlbums } from '@/apis/albums';
import useStore from './useStore';

export default function useAlbumAPI(id) {
  const store = useStore();
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    if (!store.store.albums) {
      store.setStore({
        loaded: false,
      });
      if (id) {
        getAlbumByID(id, signal)
          .then(res => res.json())
          .then(album => store.setStore({
            albums: [album],
          }))
          .catch(err => store.setStore({ error: err }));
      } else {
        getAllAlbums()
          .then(res => res.json())
          .then(albums => store.setStore({ albums }))
          .catch(err => store.setStore({ error: err }));
      }
    }
    return () => abortController.abort();
  }, [id]);

  return store;
}
