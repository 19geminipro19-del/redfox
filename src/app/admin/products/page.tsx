"use client";

import React, { useState, useEffect } from 'react';
import { VariantCard } from '@/components/admin/products/VariantCard';
import type { Product, ProductVariant } from '@/lib/types';
import { db } from '@/config/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';

export default function AdminProductsPage() {
  const [productData, setProductData] = useState<Partial<Product>>({
    title: '',
    sku: '',
    category: '',
    basePrice: 0,
    variants: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingProducts, setExistingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setExistingProducts(data);
      } catch (error) {
        console.error("Error fetching existing products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleVariantChange = (updatedVariant: ProductVariant, index: number) => {
    const newVariants = [...(productData.variants || [])];
    newVariants[index] = updatedVariant;
    setProductData({ ...productData, variants: newVariants });
  };

  const removeVariant = (index: number) => {
    const newVariants = [...(productData.variants || [])];
    newVariants.splice(index, 1);
    setProductData({ ...productData, variants: newVariants });
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Math.random().toString(36).substr(2, 9),
      colorName: '',
      images: [],
      sizes: []
    };
    setProductData({
      ...productData,
      variants: [...(productData.variants || []), newVariant]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      alert(`Product created successfully! ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Error creating product. See console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={productData.title}
                onChange={(e) => setProductData({...productData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Master SKU</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={productData.sku}
                onChange={(e) => setProductData({...productData, sku: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={productData.category}
                onChange={(e) => setProductData({...productData, category: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (USD)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="w-full p-2 border rounded"
                value={productData.basePrice}
                onChange={(e) => setProductData({...productData, basePrice: parseFloat(e.target.value)})}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Color Variants</h2>
            <button
              type="button"
              onClick={addVariant}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              + Add New Color Variant
            </button>
          </div>

          <div className="space-y-6">
            {productData.variants?.map((variant, index) => (
              <div key={variant.id} className="relative">
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors z-10"
                >
                  Remove Variant
                </button>
                <VariantCard
                  variant={variant}
                  index={index}
                  onVariantChange={handleVariantChange}
                />
              </div>
            ))}
            {(!productData.variants || productData.variants.length === 0) && (
              <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-xl bg-gray-50">
                No variants added. A product needs at least one variant.
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving to Database...' : 'Save Product to Database'}
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Existing Product Catalog</h2>
        {existingProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-xl bg-gray-50">
            No products found in the catalog.
          </div>
        ) : (
          <div className="space-y-4">
            {existingProducts.map(product => (
              <div key={product.id} className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <p className="text-sm text-gray-600">SKU: {product.sku} | Category: {product.category}</p>
                  </div>
                  <div className="font-semibold text-lg">
                    ${Number(product.basePrice).toFixed(2)}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Variants: {product.variants?.length || 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
