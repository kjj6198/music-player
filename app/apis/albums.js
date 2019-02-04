const BASE_API_URL = 'http://localhost:8080/api/albums';

export const getAlbumByID = id => fetch(`${BASE_API_URL}/${id}`);
export const getAllAlbums = () => fetch(BASE_API_URL);
