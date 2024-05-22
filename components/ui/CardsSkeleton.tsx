import CardSkeleton from "./CardSkeleton";

interface CardsSkeletonProps {
  count: number;
}

const CardsSkeleton: React.FC<CardsSkeletonProps> = ({ count }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardsSkeleton;
