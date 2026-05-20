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
    // Deep copy the local sizes array to guarantee isolation
    const currentSizes = [...(variant.sizes || [])];
    const sizeIndex = currentSizes.findIndex((s) => s.size === sizeName);

    if (sizeIndex > -1) {
      currentSizes[sizeIndex].available = !currentSizes[sizeIndex].available;
    } else {
      currentSizes.push({ size: sizeName, stock: 10, available: true });
    }

    // Direct parent update matching ONLY this component's array index
    onVariantChange({
      ...variant,
      sizes: currentSizes
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
          className="mt-1 p-2 border rounded w-full bg-white text-gray-900"
          placeholder="e.g., Peach, Mint Green"
        />
      </div>

      <div className="mb-4 bg-white p-3 rounded border">
        <span className="text-sm font-medium text-gray-600 block mb-2">Cloudinary Asset Management</span>
        {/* Cloudinary Dropzone will load here */}
      </div>

      <div>
        <span className="text-sm font-medium text-gray-600 block mb-2">Available Sizes (Sandbox Mode)</span>
        <div className="grid grid-cols-5 gap-2">
          {AVAILABLE_SIZES.map((size) => {
            const isChecked = variant.sizes?.find((s) => s.size === size)?.available || false;
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
                  className="sr-only"
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
