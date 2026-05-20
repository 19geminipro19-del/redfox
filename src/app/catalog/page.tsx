import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { Product } from '@/lib/types';
import Image from 'next/image';

export default async function CatalogPage() {
  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      return data;
    } catch (error) {
      console.error("Error fetching existing products:", error);
      return [];
    }
  };

  const existingProducts = await fetchProducts();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Red Fox Apparels Catalog</h1>

      {existingProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-xl">No products found in the catalog.</p>
          <p className="mt-2 text-sm">Please add some products from the admin dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {existingProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">

              {/* Product Image Gallery Preview */}
              <div className="bg-gray-100 h-64 relative">
                 {product.variants && product.variants[0] && product.variants[0].images && product.variants[0].images[0] ? (
                    <img
                      src={product.variants[0].images[0].url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                 ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 italic bg-gray-200">
                      No Image Available
                    </div>
                 )}
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                   ${Number(product.basePrice).toFixed(2)}
                 </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-bold text-xl text-gray-900 leading-tight mb-1">{product.title}</h3>
                  <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                </div>

                {/* Variant Color Dots Preview */}
                {product.variants && product.variants.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500 mb-2">{product.variants.length} Colors Available</p>
                    <div className="flex flex-wrap gap-2">
                       {product.variants.map(variant => (
                         <span key={variant.id} className="px-2 py-1 text-xs bg-gray-100 rounded-md text-gray-700 border border-gray-200" title={variant.colorName}>
                           {variant.colorName || 'Unnamed'}
                         </span>
                       ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
