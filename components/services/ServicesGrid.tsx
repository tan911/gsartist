import React from "react";
import { ServiceCard } from "@/components/services/service-card";
import { Service } from "@/types";

interface ServicesGridProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (serviceId: number) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  services,
  onEdit,
  onDelete,
}) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {services.map((service) => (
      <ServiceCard
        key={service.id}
        service={service}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);
