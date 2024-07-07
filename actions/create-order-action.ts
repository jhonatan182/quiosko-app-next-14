'use server';

import prisma from '@/db/prisma';
import { CreateOrderSchema } from '@/schema';
import { z } from 'zod';

export async function createOrder(data: z.infer<typeof CreateOrderSchema>) {
  const result = CreateOrderSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Ha ocurrido un error al procesar el pedido');
  }

  try {
    await prisma.order.create({
      data: {
        name: `${result.data.name} ${result.data.apellido}`,
        total: result.data.total,
        OrderProducts: {
          create: result.data.order.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
