import { configureStore } from '@reduxjs/toolkit';
import { animeDownloadSlice } from '~/store/animeDownloadSlice';
import { animeApi } from '~/store/apiSlice';

export const store = configureStore({
  reducer: {
    [animeDownloadSlice.name]: animeDownloadSlice.reducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(animeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
