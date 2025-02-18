import { configureStore } from '@reduxjs/toolkit';
import { animeDownloadSlice } from '~/store/animeDownloadSlice';

export const store = configureStore({
  reducer: {
    [animeDownloadSlice.name]: animeDownloadSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
