import React from "react";
import { Button } from "@/components/ui/buttonnew";
import { cn } from "@/lib/utils";

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
  onViewAll?: () => void;
  viewAllText?: string;
  className?: string;
  headerClassName?: string;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  children,
  onViewAll,
  viewAllText = "View All",
  className,
  headerClassName,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-6",
        className
      )}>
      <div
        className={cn(
          "flex items-center justify-between mb-4",
          headerClassName
        )}>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {onViewAll && (
          <Button
            variant="ghost"
            onClick={onViewAll}
            className="text-purple-600 hover:text-purple-700 font-medium text-sm">
            {viewAllText}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};
