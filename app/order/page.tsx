import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listado de ordenes',
  description: 'Listado de tus ordenes favoritas',
};

export default function OrderPage() {
  return (
    <div>
      <h1>Hello Page Order page</h1>
    </div>
  );
}
