import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiDotsVertical } from "react-icons/hi";

interface OverViewStatsCard {
  title: string;
  value: string;
}

const OverviewStatsCard: React.FC<OverViewStatsCard> = ({ title, value }) => {
  return (
    <Card className="hover:text-accent transition p-6">
      <div className="flex justify-between items-center mb-4">
        <CardTitle className="text-sm font-normal">{title}</CardTitle>
        <HiDotsVertical className="text-accent" />
      </div>

      <div className="font-bold text-2xl">{value}</div>
    </Card>
  );
};

export default OverviewStatsCard;
