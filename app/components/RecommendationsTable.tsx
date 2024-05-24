import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

import SectionTitle from "./SectionTitle";
import { CiPlay1 } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import SubmitBtn from "./SubmitBtn";
import { createRecommendedPlaylist } from "@/lib/actions";

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
  };
}

interface RecommendationsTableProps {
  tracks: Track[];
  title: string;
  accessToken: string;
}

const RecommendationsTable: React.FC<RecommendationsTableProps> = ({
  tracks,
  title,
  accessToken,
}) => {
  return (
    <div className="rounded-lg bg-secondary border border-border">
      <SectionTitle title={title} />
      <div className="ml-6 mb-6">
        <form action={createRecommendedPlaylist}>
          <input type="hidden" name="accessToken" value={accessToken} />
          <input
            type="hidden"
            name="recommendedTracks"
            value={JSON.stringify(tracks)}
          />
          <SubmitBtn />
        </form>
      </div>
      <Table>
        <TableHeader className=" border-y-2 border-border">
          <TableRow>
            <TableHead className="w-[50px] text-opacity font-bold">#</TableHead>
            <TableHead className="font-bold text-opacity">Title</TableHead>
            <TableHead className="font-bold text-opacity">Artist</TableHead>
            <TableHead className="font-bold text-opacity">Album</TableHead>
            <TableHead className="font-bold text-opacity ">Play</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track, index) => (
            <TableRow className="border-b-0" key={index}>
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
                <CiPlay1 className="text-accent" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecommendationsTable;
