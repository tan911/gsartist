import React from "react";
import { AddServiceButton } from "@/components/services/AddServiceButton";

interface ServiceHeaderProps {
  onAdd: () => void;
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({ onAdd }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900">Service Management</h2>
    <AddServiceButton onAdd={onAdd} />
  </div>
);
