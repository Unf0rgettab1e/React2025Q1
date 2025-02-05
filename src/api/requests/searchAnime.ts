import { fetcher } from '../fetcher';
import { TJikanResponse } from '../types';

const searchAnime = async (query: string, limit = 10) =>
  fetcher<TJikanResponse>({
    method: 'GET',
    endpoint: `${query ? '' : 'top/'}anime?q=${query}&limit=${limit}`,
  }).then(({ data: res, status, error }) => {
    return {
      data: res?.data,
      pagination: {
        last_visible_page: res?.pagination?.last_visible_page,
        has_next_page: res?.pagination?.has_next_page,
      },
      status,
      error,
    };
  });

export default searchAnime;
