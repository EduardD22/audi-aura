export interface Artist {
  followers: {
    total: number;
  };
  genres: string[];
  images: {
    url: string;
  }[];
  name: string;
  id: string;
}

export interface Track {
  id: string;
  album: {
    images: { url: string }[];
    name: string;
    release_date?: string;
  };
  artists: { name: string }[];
  name: string;
  preview_url: string;
}
