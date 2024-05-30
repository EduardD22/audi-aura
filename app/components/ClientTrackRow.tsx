"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { LucideLoader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import ReactPlayer from "react-player";

export interface Track {
  track: {
    album: {
      images: { url: string }[];
      name: string;
      release_date?: string;
    };
    artists: { name: string }[];
    name: string;
    uri?: string;
    preview_url?: string;
  };
}

interface ClientTrackRowProps {
  track: Track;
  index: number;
  currentPlayingUri: string | null;
  setCurrentPlayingUri: (uri: string | null) => void;
}

const ClientTrackRow: React.FC<ClientTrackRowProps> = ({
  track,
  index,
  currentPlayingUri,
  setCurrentPlayingUri,
}) => {
  // check if the current tracks is playing
  const isPlaying = currentPlayingUri === track.track.uri;

  const handlePlayPause = () => {
    // if track.track.uri is undefined, set it to null
    setCurrentPlayingUri(isPlaying ? null : track.track.uri ?? null);
    console.log("track uri", track.track.uri);
    console.log("preview url", track.track.preview_url);
  };
  return (
    <TableRow className="border-b-0">
      <TableCell className="font-bold text-opacity">
        {(index + 1).toString().padStart(2, "0")}
      </TableCell>
      <TableCell className="font-bold">
        <div className="flex items-center">
          <Image
            src={track.track.album.images[0].url}
            alt={track.track.name}
            width={40}
            height={40}
            className="mr-4 rounded"
          />
          {track.track.name}
        </div>
      </TableCell>
      <TableCell className="text-xs text-opacity">
        {track.track.artists.map((artist) => artist.name).join(", ")}
      </TableCell>
      <TableCell className="text-xs text-opacity">
        {track.track.album.name}
      </TableCell>
      <TableCell className="text-center">
        <button onClick={handlePlayPause}>
          {isPlaying ? (
            <CiPause1 className="text-accent" />
          ) : (
            <CiPlay1 className="text-accent" />
          )}
        </button>
        {isPlaying && (
          <ReactPlayer
            url={track.track.preview_url}
            playing={isPlaying}
            height={0}
            width={0}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default ClientTrackRow;
