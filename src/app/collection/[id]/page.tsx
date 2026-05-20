import Link from 'next/link';

// Mock data matching the collection page
const mockProducts: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Peach Chikankari Anarkali',
    price: 1850,
    sku: 'RF-PEACH-01',
    description: 'Beautifully handcrafted Peach Chikankari Anarkali suit with intricate embroidery.',
    colors: ['Peach', 'Mint', 'White'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  '2': {
    id: '2',
    title: 'Mint Green Kurti',
    price: 950,
    sku: 'RF-MINT-02',
    description: 'Elegant mint green kurti, perfect for casual outings and summer wear.',
    colors: ['Mint Green', 'Yellow'],
    sizes: ['M', 'L', 'XXL']
  }
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProducts[params.id];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link href="/collection" className="text-indigo-600 hover:underline">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Link href="/collection" className="text-indigo-600 hover:text-indigo-800 font-medium mb-8 inline-block">
        ← Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Mock Image Area */}
        <div className="bg-gray-200 aspect-[4/5] rounded-2xl flex items-center justify-center shadow-inner">
           <span className="text-gray-500 italic text-lg">[Product High-Res Image Placeholder]</span>
        </div>

        {/* Product Info Shell */}
        <div className="py-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <div className="text-3xl font-semibold text-indigo-600 mb-6">
            ₹{product.price}
          </div>

          <div className="mb-8 pb-8 border-b border-gray-200">
             <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
             <p className="text-sm text-gray-500"><span className="font-semibold text-gray-700">SKU:</span> {product.sku}</p>
          </div>

          {/* Options Shell */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Available Colors</h3>
              <div className="flex gap-2">
                 {product.colors.map((color: string) => (
                   <div key={color} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-indigo-600 cursor-pointer transition">
                     {color}
                   </div>
                 ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Select Size</h3>
              <div className="flex gap-2">
                 {product.sizes.map((size: string) => (
                   <div key={size} className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-indigo-600 hover:text-indigo-600 cursor-pointer transition">
                     {size}
                   </div>
                 ))}
              </div>
            </div>

            <button className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
