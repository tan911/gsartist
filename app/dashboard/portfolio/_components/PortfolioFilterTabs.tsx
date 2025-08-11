import React from "react";
import type { PortfolioFilterTabsProps } from "@/types";

export const PortfolioFilterTabs: React.FC<PortfolioFilterTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => (
  <div className="flex space-x-4">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          activeCategory === category
            ? "bg-purple-100 text-purple-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}>
        {category}
      </button>
    ))}
  </div>
);
