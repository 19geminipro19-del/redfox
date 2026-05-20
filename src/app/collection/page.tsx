import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';

export default async function CollectionPage() {
  let products: any[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Collection</h1>
      {products.length === 0 ? (
         <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
           <p className="text-xl">No products found in the catalog.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <Link href={`/collection/${product.id}`} key={product.id} className="block border border-gray-200 bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-72 bg-gray-100 overflow-hidden relative">
                {product.variants?.[0]?.images?.[0]?.url ? (
                  <Image
                    src={product.variants[0].images[0].url}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-200 italic">
                    No Image
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                  ${Number(product.basePrice).toFixed(2)}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">{product.category}</p>
                <h2 className="font-bold text-xl text-gray-900 mb-1">{product.title}</h2>
                <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>
                {product.variants && (
                  <p className="text-xs text-gray-500">{product.variants.length} Colors Available</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
