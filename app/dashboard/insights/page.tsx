import ArtistCard from "@/app/components/ArtistCard";
import CustomPieChart from "@/app/components/CustomPieChart";
import CustomRadarChart from "@/app/components/CustomRadarChart";
import TopTracksTable from "@/app/components/TopTracksTable";

import { auth } from "@/auth";
import {
  fetchTopArtists,
  fetchTopGenres,
  fetchTopTracks,
  getRadarChartData,
} from "@/lib/data";
import { Artist } from "@/lib/definitions";
import Image from "next/image";
import { Suspense } from "react";

interface Params {
  searchParams: {
    timeRange?: string;
  };
}

export default async function Page({ searchParams }: Params) {
  const session = await auth();

  if (!session?.user) return null;

  const accessToken = session.access_token ?? "";

  const timeRange = searchParams.timeRange || "medium_term";

  const [radarChartData, topGenres, topTracks, topArtists] = await Promise.all([
    getRadarChartData(accessToken),
    fetchTopGenres(accessToken),
    fetchTopTracks(accessToken, timeRange, 5),
    fetchTopArtists(accessToken),
  ]);

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className=" font-bold text-4xl text-text">Insights</h1>
        <div className="flex items-center gap-1">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="user avatar"
              className="rounded-full object-cover"
              width={50}
              height={50}
            />
          )}

          <p className="font-bold">
            Hi, <span className="font-bold">{session.user.name}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <CustomRadarChart data={radarChartData} />
        <CustomPieChart data={topGenres} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
        {topArtists.map((artist: Artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
      <div className="mt-5">
        <TopTracksTable tracks={topTracks} title="Top Tracks" />
      </div>
    </section>
  );
}
