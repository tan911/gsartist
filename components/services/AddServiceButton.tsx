import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/buttonnew";

interface AddServiceButtonProps {
  onAdd: () => void;
}

export const AddServiceButton: React.FC<AddServiceButtonProps> = ({
  onAdd,
}) => (
  <Button className="flex items-center" onClick={onAdd}>
    <Plus className="h-4 w-4 mr-2" />
    Add Service
  </Button>
);
