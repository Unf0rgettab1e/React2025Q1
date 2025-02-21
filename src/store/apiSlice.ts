import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Anime, TJikanRequestParams, TJikanResponse } from '~/types/animeApi';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: builder => ({
    getAnimeList: builder.query<TJikanResponse, TJikanRequestParams>({
      query: ({ query, page, limit }) => {
        const searchParams = new URLSearchParams({
          limit: (limit || 20).toString(),
        });
        if (query) searchParams.set('q', query);
        if (page) searchParams.set('page', page.toString());

        return `${query ? '' : 'top/'}anime?${searchParams}`;
      },
    }),
    getAnimeById: builder.query<{ data: Anime }, number>({
      query: id => `anime/${id}`,
    }),
  }),
});

export const { useGetAnimeListQuery, useGetAnimeByIdQuery } = animeApi;
