import { Track } from "@/app/components/TracksTable";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformRecommendedTracks(tracks: any[]): Track[] {
  return tracks.map((track) => ({
    track: {
      album: {
        images: track.album.images,
        name: track.album.name,
        release_date: track.album.release_date,
      },
      artists: track.artists,
      name: track.name,
      uri: track.uri,
    },
  }));
}
