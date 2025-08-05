import React from "react";
import { ServiceCategories } from "@/components/services/ServiceCategories";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Service } from "@/types";

interface ServiceMainProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (serviceId: number) => void;
}

export const ServiceMain: React.FC<ServiceMainProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  services,
  onEdit,
  onDelete,
}) => (
  <>
    <ServiceCategories
      categories={categories}
      activeCategory={activeCategory}
      onCategoryChange={onCategoryChange}
    />
    <ServicesGrid services={services} onEdit={onEdit} onDelete={onDelete} />
  </>
);
