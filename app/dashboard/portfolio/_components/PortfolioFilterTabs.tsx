import React from "react";
import type { PortfolioFilterTabsProps } from "@/types";

export const PortfolioFilterTabs: React.FC<PortfolioFilterTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => (
  <div className="border-b border-gray-200 bg-white rounded-lg">
    <nav className="flex p-1">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-2 py-1.5 md:px-4 md:py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
            activeCategory === category
              ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-sm"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-transparent"
          }`}>
          {category}
        </button>
      ))}
    </nav>
  </div>
);
