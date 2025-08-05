import React from "react";
import { Search } from "lucide-react";

interface ConversationSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const ConversationSearchBar: React.FC<ConversationSearchBarProps> = ({
  value,
  onChange,
}) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <input
      type="text"
      placeholder="Search conversations..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    />
  </div>
);

export default ConversationSearchBar;
