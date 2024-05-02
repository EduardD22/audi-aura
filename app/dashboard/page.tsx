import React from "react";
import OverviewStatsCard from "../components/OverviewStatsCard";
import RecentlyPlayed from "../components/RecentlyPlayed";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Page() {
  const session = await auth();

  if (!session?.user) return null;

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
        <OverviewStatsCard title="Top Artist" value="Bad Bunny" />
        <OverviewStatsCard title="Top Track" value="Mojabi Ghost" />
        <OverviewStatsCard title="Top Genre" value="Reggaeton" />
        <OverviewStatsCard title="Total Tracks" value="113k" />
      </div>
      <div className=" mt-5">
        <RecentlyPlayed />
      </div>
    </section>
  );
}
