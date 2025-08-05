import React from "react";
import { Users, Calendar, Star, DollarSign } from "lucide-react";
import { StatCard } from "@/components/ui/card";
import { statsOverviewStats } from "@/lib/data/mock-data";

export const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsOverviewStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
