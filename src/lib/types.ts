export interface ProductSize {
  size: string;
  stock: number;
  price?: number;
}

export interface ProductVariant {
  id: string;
  color: string;
  images: string[]; // Strictly deep-nested array of Cloudinary URLs
  sizes: ProductSize[]; // Strictly deep-nested isolated array for sizes
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  variants: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
}
