"use client";
import React, { useState } from "react";
import ClientTrackRow, { Track } from "./ClientTrackRow";

interface ClientTrackRowContainerProps {
  tracks: Track[];
}

const ClientTrackRowContainer: React.FC<ClientTrackRowContainerProps> = ({
  tracks,
}) => {
  const [currentPlayingUri, setCurrentPlayingUri] = useState<string | null>(
    null
  );
  return (
    <>
      {tracks.map((track, index) => (
        <ClientTrackRow
          key={index}
          track={track}
          index={index}
          currentPlayingUri={currentPlayingUri}
          setCurrentPlayingUri={setCurrentPlayingUri}
        />
      ))}
    </>
  );
};

export default ClientTrackRowContainer;
