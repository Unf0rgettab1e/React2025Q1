import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAnime } from '~/api/types';

interface AnimeDownloadState {
  selectedItems: TAnime[];
}

const initialState: AnimeDownloadState = {
  selectedItems: [],
};

export const animeDownloadSlice = createSlice({
  name: 'animeDownload',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<TAnime>) => {
      const { mal_id } = action.payload;
      const index = state.selectedItems.findIndex(item => item.mal_id === mal_id);
      if (index === -1) {
        state.selectedItems.push(action.payload);
      } else {
        state.selectedItems.splice(index, 1);
      }
    },
    clearSelections: state => {
      state.selectedItems = [];
    },
  },
});

export const { toggleItem, clearSelections } = animeDownloadSlice.actions;
