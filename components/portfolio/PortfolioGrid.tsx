import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { PortfolioItem, PortfolioGridProps } from "@/types";

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  items,
  onEdit,
  onDelete,
  onImageClick,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {items.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group cursor-pointer"
        onClick={() => onImageClick(item)}>
        <div className="aspect-square relative group">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200"
          />
          <div className="absolute inset-0 bg-opacity-100 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
              <button
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(item);
                }}>
                <Eye className="h-4 w-4 text-gray-700" />
              </button>
              <button
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item.id);
                }}>
                <Edit className="h-4 w-4 text-gray-700" />
              </button>
              <button
                className="p-2 bg-white rounded-full hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}>
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-900">{item.title}</h4>
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 mt-2">
            {item.category}
          </span>
        </div>
      </div>
    ))}
  </div>
);
