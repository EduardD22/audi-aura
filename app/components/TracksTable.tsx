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

interface TracksTableProps {
  tracks: Track[];
  title: string;
}

const TracksTable: React.FC<TracksTableProps> = ({ tracks, title }) => {
  return (
    <div className="rounded-lg bg-secondary border border-border">
      <SectionTitle title={title} />
      <Table>
        <TableHeader className=" border-y-2 border-border">
          <TableRow>
            <TableHead className="w-[50px] text-opacity font-bold">#</TableHead>
            <TableHead className="font-bold text-opacity">Title</TableHead>
            <TableHead className="font-bold text-opacity">Artist</TableHead>
            <TableHead className="font-bold text-opacity">Album</TableHead>
            <TableHead className=" text-center font-bold text-opacity ">
              Release Date
            </TableHead>
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
              <TableCell className="text-center text-xs text-opacity">
                {track.track.album.release_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TracksTable;
