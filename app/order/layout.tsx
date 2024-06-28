import OrderSidebar from '@/components/order/OrderSidebar';
import OrderSummary from '@/components/order/OrderSummary';
import { type Metadata } from 'next';

type OrderLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Listado de ordenes',
  description: 'Listado de tus ordenes favoritas',
};

export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <>
      <div className="md:flex">
        <OrderSidebar />
        <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>

        <OrderSummary />
      </div>
    </>
  );
}
