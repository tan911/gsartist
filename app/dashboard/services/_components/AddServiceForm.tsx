import React, { useState } from "react";
import { Service } from "@/types";
import { Select } from "@/components/ui/select";
import { DollarSign } from "lucide-react";

interface AddServiceFormProps {
  onSubmit: (service: Service) => void;
  onCancel: () => void;
  initialValues?: Service;
}

export const AddServiceForm: React.FC<AddServiceFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
}) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const [duration, setDuration] = useState(initialValues?.duration || "");
  const [price, setPrice] = useState(
    initialValues?.price ? String(initialValues.price) : ""
  );
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Service name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    else if (description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters.";
    if (!category.trim()) newErrors.category = "Category is required.";
    if (!duration.trim()) newErrors.duration = "Duration is required.";
    else if (!/^((\d{1,2}h( \d{1,2}m)?)|(\d{1,2}m))$/.test(duration.trim()))
      newErrors.duration =
        "Duration must be in format like '1h', '30m', or '1h 30m'.";
    if (!price.trim()) newErrors.price = "Price is required.";
    else if (isNaN(Number(price)) || Number(price) <= 0)
      newErrors.price = "Price must be a positive number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to capitalize first letter of each word
  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Helper to capitalize first letter of each sentence
  function capitalizeSentences(str: string) {
    return str.replace(/(^|[.!?]\s+)([a-z])/g, (match) => match.toUpperCase());
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      id: Date.now().toString(),
      name: capitalizeWords(name.trim()),
      category: capitalizeWords(category.trim()),
      duration: capitalizeWords(duration.trim()),
      price: parseFloat(price),
      description: capitalizeSentences(description.trim()),
    });
  };

  const categoryOptions = ["Hair", "Makeup", "Combo"];
  const durationOptions = [
    "15m",
    "30m",
    "45m",
    "1h",
    "1h 15m",
    "1h 30m",
    "1h 45m",
    "2h",
    "2h 15m",
    "2h 30m",
    "2h 45m",
    "3h",
    "3h 15m",
    "3h 30m",
    "3h 45m",
    "4h",
    "4h 30m",
    "5h",
    "5h 30m",
    "6h",
    "6h 30m",
    "7h",
    "7h 30m",
    "8h",
    "8h 30m",
    "9h",
    "9h 30m",
    "10h",
    "10h 30m",
    "11h",
    "11h 30m",
    "12h",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Service Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-purple-400"
          required
          placeholder="ex. Haircut"
        />
        <span className="text-xs text-gray-500">
          This is what clients will see—make it descriptive and appealing.
        </span>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 min-h-[80px] focus:outline-none focus:ring-0 focus:ring-purple-500 focus:border-purple-400"
          required
          placeholder="Describe your service in a way that attracts clients."
        />
        <span className="text-xs text-gray-500">
          Explain what’s included, who it’s for, or what makes it special.
        </span>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      <div>
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          error={errors.category}
          required>
          <option value="">Select category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Select
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          error={errors.duration}
          required>
          <option value="">Select duration</option>
          {durationOptions.map((dur) => (
            <option key={dur} value={dur}>
              {dur}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Price</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <DollarSign className="h-4 w-4" />
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ""))}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
            }}
            className="w-full border border-gray-300 rounded  px-8 py-2 pl-10 focus:outline-none focus:ring-0 focus:border-purple-400"
            required
            placeholder="Enter price ex. 90"
          />
        </div>
        <span className="text-xs text-gray-500">Enter the price in USD</span>
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded">
          Add
        </button>
      </div>
    </form>
  );
};
