import CustomPieChart from "@/app/components/CustomPieChart";
import CustomRadarChart from "@/app/components/CustomRadarChart";

import { auth } from "@/auth";
import { fetchTopGenres, getRadarChartData } from "@/lib/data";
import Image from "next/image";

export default async function Page() {
  const session = await auth();

  if (!session?.user) return null;

  const accessToken = session.access_token ?? "";

  const [radarChartData, topGenres] = await Promise.all([
    getRadarChartData(accessToken),
    fetchTopGenres(accessToken),
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
    </section>
  );
}