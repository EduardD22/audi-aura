import { auth } from "@/auth";
import Image from "next/image";

export default async function Page() {
  const session = await auth();

  if (!session?.user) return null;

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
    </section>
  );
}
