"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { BiError } from "react-icons/bi";
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 1
        );
      }, 300); // 30 seconds * 1000ms / 100 (1% every 0.3s)

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (track.track.preview_url) {
      // if track.track.uri is undefined, set it to null
      setCurrentPlayingUri(isPlaying ? null : track.track.uri ?? null);
    }
  };

  const handleEnded = () => {
    setCurrentPlayingUri(null);
    setProgress(0);
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
      <TableCell className="text-center relative">
        <div className="relative w-8 h-8 flex items-center justify-center">
          {track.track.preview_url ? (
            <>
              <button onClick={handlePlayPause} className="relative z-10">
                {isPlaying ? (
                  <CiPause1 className="text-accent" title="Pause" />
                ) : (
                  <CiPlay1 className="text-accent" title="Play" />
                )}
              </button>
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <CircularProgressbar
                    value={progress}
                    styles={buildStyles({
                      pathColor: "rgba(253,163,18)",
                      trailColor: "#d6d6d6",
                      strokeLinecap: "round",
                      pathTransitionDuration: 0.3,
                    })}
                    className="w-10 h-10"
                  />
                </div>
              )}

              {isPlaying && (
                <ReactPlayer
                  url={track.track.preview_url}
                  playing={isPlaying}
                  height={0}
                  width={0}
                  onEnded={handleEnded}
                />
              )}
            </>
          ) : (
            <BiError
              className="text-red-500 text-xl"
              title="No preview available"
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ClientTrackRow;
