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

export interface Playlist {
  id: string;
  name: string;
  description: string;
  owner: {
    display_name: string;
  };
  external_urls: { spotify: string };
  images: { url: string }[];
  tracks: {
    total: number;
  };
}
