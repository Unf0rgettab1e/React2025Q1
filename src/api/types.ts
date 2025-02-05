export type TAnime = {
  mal_id: number;
  title_english: string;
  synopsis: string;
  url: string;
  images: {
    jpg: {
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
  score: number;
  episodes: number;
  type: string;
  source: string;
};

export type TJikanResponse = {
  data: TAnime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
};
