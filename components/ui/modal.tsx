"use client";
import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 backdrop-blur-md flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg p-6 w-[80vw] max-w-3xl sm:w-full sm:max-w-full overflow-y-auto max-h-[90vh] shadow-xl ${maxWidth}`}
        style={{ width: "80vw", maxWidth: "900px" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[70vh]">{children}</div>
      </div>
    </div>
  );
};
