export interface ProductSize {
  size: string;       // e.g., 'M', 'L', 'XL', '40', '42'
  stock: number;      // Wholesale/B2B inventory level
  available: boolean; // Toggle availability status
}

export interface CloudinaryImage {
  url: string;        // Secure delivery URL from Cloudinary CDN
  publicId: string;   // Public ID for remote asset deletion/management
}

export interface ProductVariant {
  id: string;                 // Unique identifier for this color variant
  colorName: string;          // e.g., 'Peach', 'Mint Green', 'Lavender'
  images: CloudinaryImage[]; // DEEP ISOLATION: Cloudinary assets strictly for this color
  sizes: ProductSize[];      // DEEP ISOLATION: Sizes & inventory strictly for this color
}

export interface Product {
  id?: string;                // Firestore Auto-Generated Document ID
  title: string;              // High-end catalog name
  sku: string;                // Stock Keeping Unit for B2B ordering
  category: string;           // Apparel category
  basePrice: number;          // Standard wholesale base price
  variants: ProductVariant[]; // Independent structural tree
  createdAt: any;             // Firestore serverTimestamp
  updatedAt: any;             // Firestore serverTimestamp
}
