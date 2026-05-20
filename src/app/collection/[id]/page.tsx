import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  let product: Product | null = null;

  try {
    const docRef = doc(db, 'products', params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      product = { id: docSnap.id, ...docSnap.data() } as Product;
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
          <Link href="/collection" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <Link href="/collection" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 font-medium">
          ← Back to Collection
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Main Image View */}
        <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative shadow-sm border border-gray-200">
           {product.variants?.[0]?.images?.[0]?.url ? (
             <Image
               src={product.variants[0].images[0].url}
               alt={product.title}
               fill
               className="object-cover"
             />
           ) : (
             <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-100 text-lg italic">
               No Image Available
             </div>
           )}
        </div>

        {/* Product Info */}
        <div className="py-4">
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.title}</h1>
          <div className="text-3xl font-light text-gray-900 mb-6">
            ${Number(product.basePrice).toFixed(2)}
          </div>
          <p className="text-gray-500 mb-8 border-b border-gray-100 pb-8">
            <span className="font-semibold text-gray-700">SKU:</span> {product.sku}
          </p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Variants</h3>
              <div className="space-y-6">
                {product.variants.map((variant, idx) => (
                  <div key={variant.id || idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="font-medium text-gray-800 mb-3">{variant.colorName || 'Unnamed Color'}</p>

                    {/* Variant Images */}
                    {variant.images && variant.images.length > 0 ? (
                      <div className="flex gap-3 overflow-x-auto pb-3 mb-4">
                        {variant.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="relative w-20 h-20 flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden">
                            <Image src={img.url} alt={`${variant.colorName} view ${imgIdx + 1}`} fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic mb-4">No images for this color.</p>
                    )}

                    {/* Variant Sizes */}
                    {variant.sizes && variant.sizes.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Available Sizes</p>
                        <div className="flex flex-wrap gap-2">
                          {variant.sizes.filter(s => s.available).map((size, sizeIdx) => (
                            <span key={sizeIdx} className="px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-800 rounded-md text-sm font-medium">
                              {size.size}
                            </span>
                          ))}
                          {variant.sizes.filter(s => s.available).length === 0 && (
                             <span className="text-sm text-red-500 italic">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
