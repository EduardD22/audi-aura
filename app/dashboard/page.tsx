import React from "react";
import OverviewStatsCard from "../components/OverviewStatsCard";
import RecentlyPlayed from "../components/RecentlyPlayed";
import { auth } from "@/auth";
import Image from "next/image";
import {
  fetchRecentlyPlayed,
  fetchTopArtist,
  fetchTopGenre,
  fetchTopTrack,
  fetchTotalTracks,
} from "@/lib/data";

export default async function Page() {
  const session = await auth();

  if (!session?.user) return null;

  console.log("Session:", session); // Log the session object
  console.log("Access Token:", session.access_token); // Log the access token

  const accessToken = session.access_token ?? "";
  const [topArtist, topTrack, topGenre, totalTracks, recentlyPlayed] =
    await Promise.all([
      fetchTopArtist(accessToken),
      fetchTopTrack(accessToken),
      fetchTopGenre(accessToken),
      fetchTotalTracks(accessToken),
      fetchRecentlyPlayed(accessToken),
    ]);

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className=" font-bold text-4xl text-text">Overview</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        <OverviewStatsCard title="Top Artist" value={topArtist} />
        <OverviewStatsCard title="Top Track" value={topTrack} />
        <OverviewStatsCard title="Top Genre" value={topGenre} />
        <OverviewStatsCard title="Saved Songs" value={totalTracks} />
      </div>
      <div className=" mt-5">
        <RecentlyPlayed tracks={recentlyPlayed} />
      </div>
    </section>
  );
}
