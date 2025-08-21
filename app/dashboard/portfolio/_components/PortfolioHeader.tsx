import React from 'react';
import { Plus } from 'lucide-react';
import { Heading2 } from '@/components/typography/Heading2';
import { cn } from '@/lib/utils';

interface PortfolioHeaderProps {
  onAddClick: () => void;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex items-center justify-between">
      <Heading2 className={cn("text-left text-gray-900")}>
        Portfolio Management
      </Heading2>
      <button
        onClick={onAddClick}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
        <Plus className="h-4 w-4 mr-2" />
        Add Media
      </button>
    </div>
  );
};