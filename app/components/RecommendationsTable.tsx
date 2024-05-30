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
import ClientTrackRowContainer from "./ClientTrackRowContainer";

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
            <TableHead className="font-bold text-opacity text-center ">
              Play
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ClientTrackRowContainer tracks={tracks} />
        </TableBody>
      </Table>
    </div>
  );
};

export default RecommendationsTable;
