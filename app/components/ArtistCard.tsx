import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Artist } from "@/lib/definitions";
import Image from "next/image";
import React from "react";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(0)}K`;
    } else {
      return followers.toString();
    }
  };

  return (
    <Card className="relative overflow-hidden border border-border transition-transform duration-300 ease-in-out hover:scale-105">
      <CardHeader>
        <Image
          src={artist.images[0].url}
          alt={artist.name}
          fill
          className="absolute inset-0 object-cover opacity-70"
        />
      </CardHeader>
      <CardContent className="relative ">
        <CardTitle className="text-2xl ">{artist.name}</CardTitle>
        <p className="text-sm">
          {formatFollowers(artist.followers.total)} followers
        </p>
      </CardContent>
      <CardFooter className="relative">
        <p className="text-sm capitalize ">
          {artist.genres.length > 0 ? artist.genres[0] : "Genre not available"}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ArtistCard;
