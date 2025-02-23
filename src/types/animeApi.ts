export interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string;
  title_synonyms: string[];
  synopsis?: string;
  url?: string;
  images: {
    jpg?: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  score?: number;
  episodes?: number;
  status?: string;
  type?: string;
  source?: string;
  duration?: string;
  airing?: boolean;
  aired?: {
    from: string | null;
    to: string | null;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
    };
    string: string;
  };
  rating?: string;
  genres?: { mal_id: number; type: string; name: string; url: string }[];
  explicit_genres?: { mal_id: number; type: string; name: string; url: string }[];
  trailer?: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    };
  };
  approved: boolean;
  titles: { type: string; title: string }[];
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  year: number | null;
  background: string;
  season?: string | null;
  studios: { mal_id: number; name: string; type: string; url: string }[];
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: { mal_id: number; name: string; type: string; url: string }[];
  licensors: { mal_id: number; name: string; type: string; url: string }[];
  themes: { mal_id: number; name: string; type: string; url: string }[];
  demographics: { mal_id: number; name: string; type: string; url: string }[];
}

export interface AnimePagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
}

export type TJikanResponse = {
  data: Anime[];
  pagination: AnimePagination;
};

export type TJikanRequestParams = {
  query?: string;
  page?: number;
  limit?: number;
};
