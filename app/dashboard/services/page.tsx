"use client";
import React from "react";
import { services as mockServices } from "@/lib/data/mock-data";
import { Service } from "@/types";
import { ServiceHeader } from "@/app/dashboard/services/_components/ServiceHeader";
import { ServiceModals } from "@/app/dashboard/services/_components/ServiceModals";
import { ServiceMain } from "@/app/dashboard/services/_components/ServiceMain";
import { useServiceFilter } from "@/lib/hooks/useServiceFilter";

export default function ServicesPage() {
  const categories = ["All", "Hair", "Makeup", "Combo"];
  const [activeCategory, setActiveCategory] = React.useState<string>(
    categories[0] ?? "All"
  );
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);
  const [services, setServices] = React.useState(mockServices);
  const [editingService, setEditingService] = React.useState<Service | null>(
    null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [serviceToDelete, setServiceToDelete] = React.useState<Service | null>(
    null
  );

  // Use custom hook for filtering services
  const filteredServices = useServiceFilter(services, activeCategory);

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setAddModalOpen(true);
  };

  const handleDeleteService = (serviceId: number) => {
    const service = services.find((s) => Number(s.id) === serviceId) || null;
    setServiceToDelete(service);
    setDeleteModalOpen(true);
  };

  const handleAddService = (service: Service) => {
    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id ? { ...service, id: editingService.id } : s
        )
      );
      setEditingService(null);
    } else {
      setServices((prev) => [...prev, service]);
    }
    setAddModalOpen(false);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="space-y-2 md:space-y-4">
      <ServiceHeader
        onAdd={() => {
          setEditingService(null);
          setAddModalOpen(true);
        }}
      />
      <ServiceModals
        isAddModalOpen={isAddModalOpen}
        setAddModalOpen={setAddModalOpen}
        editingService={editingService}
        setEditingService={setEditingService}
        onAdd={handleAddService}
        isDeleteModalOpen={isDeleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        serviceToDelete={serviceToDelete}
        setServiceToDelete={setServiceToDelete}
        setServices={setServices}
        services={services}
      />
      <ServiceMain
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        services={filteredServices}
        onEdit={handleEditService}
        onDelete={handleDeleteService}
      />
    </div>
  );
}
