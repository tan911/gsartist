import React from "react";

interface ReviewsFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const ReviewsFilter: React.FC<ReviewsFilterProps> = ({
  value,
  onChange,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded-md px-3 py-2">
    <option value="All">All Reviews</option>
    <option value="Replied">Replied</option>
    <option value="Pending">Pending Reply</option>
  </select>
);
