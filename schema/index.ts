import { z } from 'zod';

export const OrderValidFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Tu nombre es obligatorio',
    })
    .refine((data) => isNaN(Number(data)), {
      message: 'Nombre no valido',
    }),
  apellido: z
    .string()
    .min(2, {
      message: 'Tu apellido es obligatorio',
    })
    .refine(
      (data) => {
        if (isNaN(Number(data))) {
          return true;
        }

        return false;
      },
      {
        message: 'Apellido no valido',
      }
    ),
});

export const CreateOrderSchema = OrderValidFormSchema.extend({
  total: z.number().min(1, { message: 'El total debe ser mayor a 0' }),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
});
