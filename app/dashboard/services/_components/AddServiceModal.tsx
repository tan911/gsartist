import React from "react";
import { Modal } from "@/components/ui/modal";
import { AddServiceForm } from "./AddServiceForm";
import { Service } from "@/types";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: Service) => void;
  initialValues?: Service;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  initialValues,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialValues ? "Edit Service" : "Add Service"}>
      <AddServiceForm
        onSubmit={onAdd}
        onCancel={onClose}
        initialValues={initialValues}
      />
    </Modal>
  );
};
