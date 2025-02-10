export type TAnime = {
  mal_id: number;
  title_english: string;
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
  type?: string;
  source?: string;
  duration?: string;
  aired?: {
    from: string;
    to: string;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number;
        month: number;
        year: number;
      };
      string: 'string';
    };
  };
  rating?: string;
  genres?: { mal_id: number; name: string }[];
  trailer?: { url: string; embed_url: string };
};

export type TPagination = {
  last_visible_page: number;
  has_next_page: boolean;
};

export type TJikanResponse = {
  data: TAnime[];
  pagination?: TPagination;
};
