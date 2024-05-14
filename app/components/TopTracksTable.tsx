"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

import SectionTitle from "./SectionTitle";

import { useRouter, useSearchParams } from "next/navigation";

interface Track {
  album: {
    images: { url: string }[];
    name: string;
    release_date?: string;
  };
  artists: { name: string }[];
  name: string;
}

interface TopTracksTableProps {
  tracks: Track[];
  title: string;
}

const TopTracksTable: React.FC<TopTracksTableProps> = ({ tracks, title }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleTimeRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("timeRange", value);
    const newUrl = `/dashboard/insights?${params.toString()}`;
    window.history.pushState(
      null,
      "",
      `/dashboard/insights?${params.toString()}`
    );
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="rounded-lg bg-secondary border border-border">
      <SectionTitle title={title} />
      <div className="ml-6 mb-6">
        <Select onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Time Range</SelectLabel>
              <SelectItem value="short_term">Short Term</SelectItem>
              <SelectItem value="medium_term">Medium Term</SelectItem>
              <SelectItem value="long_term">Long Term</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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
                    src={track.album.images[0].url}
                    alt={track.name}
                    width={40}
                    height={40}
                    className="mr-4 rounded"
                  />
                  {track.name}
                </div>
              </TableCell>
              <TableCell className="text-xs text-opacity">
                {track.artists.map((artist) => artist.name).join(", ")}
              </TableCell>
              <TableCell className="text-xs text-opacity">
                {track.album.name}
              </TableCell>
              <TableCell className="text-center text-xs text-opacity">
                {track.album.release_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopTracksTable;
