import { useEffect } from 'react';
import { getAlbumByID, getAllAlbums } from '@/apis/albums';
import useStore from './useStore';

export default function useAlbumAPI(id) {
  const store = useStore();
  useEffect(() => {
    let stream$ = null;
    if (!store.store.albums) {
      store.setStore({
        loaded: false,
        error: false,
      });

      if (id) {
        stream$ = getAlbumByID(id).subscribe(
          album => store.setStore({
            albums: [album],
          }),
          err => store.setStore({ error: err }),
        );
      } else {
        stream$ = getAllAlbums().subscribe(
          albums => store.setStore({ albums }),
          err => store.setStore({ error: err }),
        );
      }
    }
    return () => (stream$ ? stream$.unsubscribe() : null);
  }, [id]);

  return store;
}
