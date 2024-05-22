import React from "react";
import ArtistCard from "./ArtistCard";
import { Artist } from "@/lib/definitions";
import { auth } from "@/auth";
import { fetchRecommendedArtists } from "@/lib/data";

const CardWrapper = async () => {
  const session = await auth();

  if (!session?.user) return null;

  const accessToken = session.access_token ?? "";

  const [recommendedArtists] = await Promise.all([
    fetchRecommendedArtists(accessToken),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
      {recommendedArtists.map((artist: Artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default CardWrapper;
