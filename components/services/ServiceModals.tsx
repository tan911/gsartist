import React from "react";
import { AddServiceModal } from "@/components/services/AddServiceModal";
import { DeleteServiceModal } from "@/components/services/DeleteServiceModal";
import { Service } from "@/types";

interface ServiceModalsProps {
  isAddModalOpen: boolean;
  setAddModalOpen: (open: boolean) => void;
  editingService: Service | null;
  setEditingService: (service: Service | null) => void;
  onAdd: (service: Service) => void;
  isDeleteModalOpen: boolean;
  setDeleteModalOpen: (open: boolean) => void;
  serviceToDelete: Service | null;
  setServiceToDelete: (service: Service | null) => void;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  services: Service[];
}

export const ServiceModals: React.FC<ServiceModalsProps> = ({
  isAddModalOpen,
  setAddModalOpen,
  editingService,
  setEditingService,
  onAdd,
  isDeleteModalOpen,
  setDeleteModalOpen,
  serviceToDelete,
  setServiceToDelete,
  setServices,
  services,
}) => (
  <>
    <AddServiceModal
      isOpen={isAddModalOpen}
      onClose={() => {
        setAddModalOpen(false);
        setEditingService(null);
      }}
      onAdd={onAdd}
      initialValues={editingService || undefined}
    />
    <DeleteServiceModal
      isOpen={isDeleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
      onConfirm={() => {
        if (serviceToDelete) {
          setServices((prev) =>
            prev.filter((s) => s.id !== serviceToDelete.id)
          );
        }
        setDeleteModalOpen(false);
        setServiceToDelete(null);
      }}
    />
  </>
);
