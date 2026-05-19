import React from 'react';
import { ProductVariant, ProductSize } from '@/lib/types';

interface VariantCardProps {
  variant: ProductVariant;
  index: number;
  onVariantChange: (updatedVariant: ProductVariant, index: number) => void;
}

export const VariantCard: React.FC<VariantCardProps> = ({ variant, index, onVariantChange }) => {
  const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44'];

  const handleSizeToggle = (sizeName: string) => {
    // 1. Create a deep copy of the existing sizes for THIS variant only
    const currentSizes = [...variant.sizes];
    const sizeIndex = currentSizes.findIndex((s) => s.size === sizeName);

    if (sizeIndex > -1) {
      // If size exists, toggle its availability
      currentSizes[sizeIndex].available = !currentSizes[sizeIndex].available;
    } else {
      // If size doesn't exist in array, push it freshly for this variant
      currentSizes.push({ size: sizeName, stock: 10, available: true });
    }

    // 2. Pass the updated isolated array back up to the parent array context
    onVariantChange({
      ...variant,
      sizes: currentSizes // Replaces ONLY this variant's sizes array
    }, index);
  };

  return (
    <div className="p-6 my-4 border-2 border-gray-200 rounded-xl bg-gray-50 shadow-sm">
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">Variant Color Name</label>
        <input
          type="text"
          value={variant.colorName}
          onChange={(e) => onVariantChange({ ...variant, colorName: e.target.value }, index)}
          className="mt-1 p-2 border rounded w-full"
          placeholder="e.g., Peach, Mint Green"
        />
      </div>

      {/* Cloudinary Images Section Specific to this color */}
      <div className="mb-4 bg-white p-3 rounded border">
        <span className="text-sm font-medium text-gray-600 block mb-2">Cloudinary Media Gallery for {variant.colorName || 'this variant'}</span>
        {/* Isolated Cloudinary Upload Button & Previews go here */}
      </div>

      {/* Strict Isolated Size Grid Selection */}
      <div>
        <span className="text-sm font-medium text-gray-600 block mb-2">Select Available Sizes (Strictly Isolated for this Color)</span>
        <div className="grid grid-cols-5 gap-2">
          {AVAILABLE_SIZES.map((size) => {
            const isChecked = variant.sizes.find((s) => s.size === size)?.available || false;
            return (
              <label
                key={size}
                className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer text-sm font-bold transition-all ${
                  isChecked ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleSizeToggle(size)}
                  className="sr-only" // Hidden checkbox, fully managed by state
                />
                {size}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
