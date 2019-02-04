const BASE_API_URL = 'http://localhost:8080/api/albums';

// [TODO] use retry logic.
export const getAlbumByID = id => fetch(`${BASE_API_URL}/${id}`).then((res) => {
  if (!res.ok) {
    throw Error('can not fetch API');
  }
  return res;
});
export const getAllAlbums = () => fetch(BASE_API_URL).then((res) => {
  if (!res.ok) {
    throw Error('can not fetch API');
  }
  return res;
});
