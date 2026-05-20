import { redirect } from 'next/navigation';

export default function Home() {
  // Auto-redirect to our admin panel for now
  redirect('/admin/products');
}
