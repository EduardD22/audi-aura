import ArtistCard from "@/app/components/ArtistCard";
import CardWrapper from "@/app/components/CardWrapper";
import TracksTable from "@/app/components/TracksTable";

import { auth } from "@/auth";
import CardsSkeleton from "@/components/ui/CardsSkeleton";
import { fetchRecommendedTracks } from "@/lib/data";

import { Artist } from "@/lib/definitions";
import { transformRecommendedTracks } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";
import { FaPlus } from "react-icons/fa";

export default async function Page() {
  const session = await auth();

  if (!session?.user) return null;

  const accessToken = session.access_token ?? "";

  const [recommendedTracksData] = await Promise.all([
    fetchRecommendedTracks(accessToken),
  ]);

  const recommendedTracks = transformRecommendedTracks(recommendedTracksData);

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className=" font-bold text-4xl text-text">Recommendations</h1>
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

      <Suspense fallback={<CardsSkeleton count={4} />}>
        <CardWrapper />
      </Suspense>
      <div className=" mt-5">
        <TracksTable
          title="Recommended Tracks"
          tracks={recommendedTracks}
          icon={FaPlus}
        />
      </div>
    </section>
  );
}
