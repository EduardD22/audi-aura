import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
  image: string;
}

const RecentlyPlayed: React.FC = () => {
  const songs: Song[] = [
    {
      id: 1,
      title: "Song 1",
      artist: "Artist 1",
      album: "Album 1",
      releaseYear: 2022,
      image: "/images/test-image.png",
    },
    {
      id: 2,
      title: "Song 2",
      artist: "Artist 2",
      album: "Album 2",
      releaseYear: 2021,
      image: "/images/test-image.png",
    },
    {
      id: 3,
      title: "Song 3",
      artist: "Artist 3",
      album: "Album 3",
      releaseYear: 2021,
      image: "/images/test-image.png",
    },
    {
      id: 4,
      title: "Song 4",
      artist: "Artist 4",
      album: "Album 4",
      releaseYear: 2021,
      image: "/images/test-image.png",
    },
    {
      id: 5,
      title: "Song 5",
      artist: "Artist 5",
      album: "Album 5",
      releaseYear: 2021,
      image: "/images/test-image.png",
    },
  ];

  return (
    <div className="rounded-lg bg-secondary border">
      <h2 className=" p-6 text-2xl font-bold">Recently Played Songs</h2>
      <Table>
        <TableHeader className=" border-y-2">
          <TableRow>
            <TableHead className="w-[50px] font-bold text-opacity-50">
              #
            </TableHead>
            <TableHead className="font-bold text-text text-opacity-50">
              Title
            </TableHead>
            <TableHead className="font-bold text-opacity-50">Artist</TableHead>
            <TableHead className="font-bold text-opacity-50">Album</TableHead>
            <TableHead className=" text-center font-bold text-opacity-50">
              Release Year
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow className="border-b-0" key={song.id}>
              <TableCell className="font-bold">
                {song.id.toString().padStart(2, "0")}
              </TableCell>
              <TableCell className="font-bold">
                <div className="flex items-center">
                  <Image
                    src={song.image}
                    alt={song.title}
                    width={40}
                    height={40}
                    className="mr-4 rounded"
                  />
                  {song.title}
                </div>
              </TableCell>
              <TableCell className="text-xs">{song.artist}</TableCell>
              <TableCell className="text-xs">{song.album}</TableCell>
              <TableCell className="text-center text-xs">
                {song.releaseYear}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentlyPlayed;
