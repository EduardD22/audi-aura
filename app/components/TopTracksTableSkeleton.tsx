import { Skeleton } from "@/components/ui/skeleton";

const TopTracksTableSkeleton = () => {
  return (
    <div className="rounded-lg bg-secondary border border-border">
      <Skeleton className="h-8 w-40" />
      <div className="mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 py-2">
            <Skeleton className="h-10 w-10 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTracksTableSkeleton;
