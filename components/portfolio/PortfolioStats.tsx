import React from "react";
import { GalleryHorizontal, Scissors, Brush } from "lucide-react";
import type { PortfolioItem, PortfolioStatsProps } from "@/types";

export const PortfolioStats: React.FC<PortfolioStatsProps> = ({
  portfolioItems,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Total Items</p>
          <p className="text-2xl font-bold text-gray-900">
            {portfolioItems.length}
          </p>
        </div>
        <GalleryHorizontal className="h-8 w-8 text-purple-600" />
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Hair Work</p>
          <p className="text-2xl font-bold text-gray-900">
            {portfolioItems.filter((item) => item.category === "Hair").length}
          </p>
        </div>
        <Scissors className="h-8 w-8 text-purple-600" />
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Makeup Work</p>
          <p className="text-2xl font-bold text-gray-900">
            {portfolioItems.filter((item) => item.category === "Makeup").length}
          </p>
        </div>
        <Brush className="h-8 w-8 text-purple-600" />
      </div>
    </div>
  </div>
);
