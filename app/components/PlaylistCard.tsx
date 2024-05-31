import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Playlist } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <Link href={playlist.external_urls.spotify} target="_blank">
      <Card className="relative overflow-hidden border border-border transition-transform duration-300 ease-in-out hover:scale-105">
        <CardHeader>
          <Image
            src={playlist.images[0].url}
            alt={playlist.name}
            fill
            className="absolute inset-0 object-cover opacity-70"
          />
        </CardHeader>
        <CardContent className="relative">
          <CardTitle className="text-2xl">{playlist.name}</CardTitle>
        </CardContent>
        <CardFooter className="relative">
          <p className="text-sm capitalize">{playlist.owner.display_name}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
