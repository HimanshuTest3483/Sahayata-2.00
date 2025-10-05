import React from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Filter className="text-gray-400 h-5 w-5" />
      <select
        className="border border-gray-300 rounded-md py-2 px-4 focus:ring-rose-500 focus:border-rose-500"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="Treatment">Treatment</option>
        <option value="Wellness">Wellness</option>
        <option value="Support">Support</option>
      </select>
    </div>
  );
};

export default CategoryFilter;