import React from "react";
import type { PortfolioUploadFormProps } from "@/types";

export const PortfolioUploadForm: React.FC<PortfolioUploadFormProps> = ({
  title,
  setTitle,
  category,
  setCategory,
  onUpload,
  onClose,
  disabled,
  isEdit,
}) => (
  <>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Title
      </label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category
      </label>
      <select
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}>
        <option>Hair</option>
        <option>Makeup</option>
        <option>Combo</option>
      </select>
    </div>
    <div className="flex space-x-3 pt-4">
      {/*
        NOTE: Modifying the image file name for permanent storage must be handled on the server
        before saving to the database. The client can only suggest a name for download purposes.
      */}
      <button
        onClick={onClose}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
        Cancel
      </button>
      <button
        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        onClick={onUpload}
        disabled={disabled}>
        {isEdit ? "Save Changes" : "Upload"}
      </button>
    </div>
  </>
);
