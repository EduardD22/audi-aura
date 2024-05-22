import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Skeleton } from "./skeleton";

const CardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden border border-border transition-transform duration-300 ease-in-out hover:scale-105">
      <CardHeader>
        <Skeleton />
      </CardHeader>
      <CardContent className="relative">
        <CardTitle>
          <Skeleton className="w-3/4 h-6 bg-gray-200" />
        </CardTitle>

        <Skeleton className="w-1/2 h-4 mt-2 bg-gray-200" />
      </CardContent>
      <CardFooter className="relative">
        <Skeleton className="w-1/3 h-4 bg-gray-200" />
      </CardFooter>
    </Card>
  );
};

export default CardSkeleton;
