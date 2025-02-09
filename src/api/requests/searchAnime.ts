import { createSearchParams } from 'react-router';
import { fetcher } from '../fetcher';
import { TJikanResponse } from '../types';

const searchAnime = async (query: string, page = 1, limit = 20) => {
  const params = createSearchParams({
    q: query,
    page: page.toString(),
    limit: limit.toString(),
  });

  return fetcher<TJikanResponse>({
    method: 'GET',
    endpoint: `${query ? '' : 'top/'}anime?${params}`,
  }).then(({ data: res, status, error }) => {
    return {
      ...res,
      data: res?.data,
      status,
      error,
    };
  });
};

export default searchAnime;
