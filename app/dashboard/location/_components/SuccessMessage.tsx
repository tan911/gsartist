import React from "react";
import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  show: boolean;
  message?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  show,
  message = "Location settings updated successfully!",
}) => {
  if (!show) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4">
      <div className="flex items-center">
        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
        <span className="text-green-800 font-medium">{message}</span>
      </div>
    </div>
  );
};

export default SuccessMessage;
