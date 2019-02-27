import { ajax } from 'rxjs/ajax';
import { range, timer, throwError } from 'rxjs';
import { retryWhen, zip } from 'rxjs/operators';

const BASE_API_URL = 'http://localhost:8080/api/albums';

const createRetryAPI = src => ajax
  .getJSON(src)
  .pipe(
    retryWhen(errors => errors.pipe(
      zip(range(1, 5), (err, count) => (count < 5 ? timer(2 ** count, 1000) : throwError(err))),
    )),
  );

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
