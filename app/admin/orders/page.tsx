import Heading from '@/components/Heading';
import OrderCard from '@/components/order/OrderCard';
import prisma from '@/db/prisma';

async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      OrderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}

export default async function OrderAdminPage() {
  const orders = await getPendingOrders();

  return (
    <>
      <Heading>Administrar Ordenes</Heading>

      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay ordenes pendientes</p>
      )}
    </>
  );
}
