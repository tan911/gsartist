import React from "react";
import { Button } from "@/components/ui/buttonnew";

interface ServiceCategoriesProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => (
  <div className="flex space-x-4">
    {categories.map((category) => (
      <Button
        key={category}
        variant={category === activeCategory ? "primary" : "secondary"}
        size="sm"
        onClick={() => onCategoryChange(category)}>
        {category}
      </Button>
    ))}
  </div>
);
