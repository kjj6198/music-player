import { ajax } from 'rxjs/ajax';
import { timer, throwError } from 'rxjs';
import { retryWhen, mergeMap } from 'rxjs/operators';

const BASE_API_URL = 'http://localhost:8080/api/albums';

const createRetryAPI = (src, retryCount) => ajax
  .getJSON(src)
  .pipe(
    retryWhen(errors => errors.pipe(
      mergeMap((err, count) => (count + 1 < retryCount ? timer(2 ** count * 1000) : throwError(err))),
    )),
  );

// [TODO] use retry logic.
export const getAlbumByID = id => createRetryAPI(`${BASE_API_URL}/${id}`, 5);
export const getAllAlbums = () => createRetryAPI(BASE_API_URL, 5);
