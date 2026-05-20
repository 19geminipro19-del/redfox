import Link from 'next/link';

// Mock data to ensure the UI looks perfect before we hook up the database
const mockProducts = [
  { id: '1', title: 'Peach Chikankari Anarkali', price: 1850, image: '/placeholder.jpg' },
  { id: '2', title: 'Mint Green Kurti', price: 950, image: '/placeholder.jpg' }
];

export default function CollectionPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Our Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockProducts.map((product) => (
          <Link href={`/collection/${product.id}`} key={product.id} className="group border rounded-xl p-4 shadow-sm hover:shadow-lg transition">
            <div className="bg-gray-200 h-64 rounded-lg mb-4 flex items-center justify-center text-gray-500 italic">
              [Product Image Placeholder]
            </div>
            <h2 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">{product.title}</h2>
            <p className="text-indigo-600 font-semibold mt-1">₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
