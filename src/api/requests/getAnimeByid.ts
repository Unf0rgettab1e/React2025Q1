import { fetcher } from '../fetcher';
import { TAnime } from '../types';

const getAnimeById = async (id: number) => {
  return fetcher<{ data: TAnime }>({
    method: 'GET',
    endpoint: `anime/${id}`,
  }).then(({ data: res, status, error }) => {
    return {
      data: res?.data,
      status,
      error,
    };
  });
};

export default getAnimeById;
