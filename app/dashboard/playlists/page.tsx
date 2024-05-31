import PlaylistCard from "@/app/components/PlaylistCard";
import { auth } from "@/auth";
import { fetchFeaturedPlaylists } from "@/lib/data";
import { Playlist } from "@/lib/definitions";
import Image from "next/image";

export default async function Page() {
  const session = await auth();

  if (!session?.user) return null;

  const accessToken = session.access_token ?? "";

  const featuredPlaylists = await fetchFeaturedPlaylists(accessToken);

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className=" font-bold text-4xl text-text">Featured Playlists</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
        {featuredPlaylists.map((playlist: Playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  );
}
