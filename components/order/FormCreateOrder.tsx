'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '../ui/form';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createOrder } from '@/actions/create-order-action';
import { useEffect } from 'react';
import { OrderValidFormSchema } from '@/schema';
import { useStore } from '@/store';

type FormCreateOrderProps = {
  totalOrder: number;
};

export default function FormCreateOrder({ totalOrder }: FormCreateOrderProps) {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);

  const form = useForm<z.infer<typeof OrderValidFormSchema>>({
    resolver: zodResolver(OrderValidFormSchema),
    defaultValues: {
      name: '',
      apellido: '',
    },
  });

  const handleCreateOrder = async (
    data: z.infer<typeof OrderValidFormSchema>
  ) => {
    try {
      await createOrder({
        name: data.name,
        apellido: data.apellido,
        total: totalOrder,
        order: order,
      });

      form.reset();
      clearOrder();
      toast.success('Pedido Realizado Correctamente');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {

    if (Object.keys(form.formState.errors).length > 0) {
      toast.error('Todos los campos son obligatorios');
    }
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form
        className="w-full mt-10 space-y-5"
        onSubmit={form.handleSubmit(handleCreateOrder)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Tu nombre"
                  {...field}
                  error={form.formState.errors.name}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apellido"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Tu apellido"
                  {...field}
                  error={form.formState.errors.apellido}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-black font-bold text-white w-full uppercase py-2 rounded"
          disabled={form.formState.isSubmitting}
        >
          Confirmar pedido
        </Button>
      </form>
    </Form>
  );
}
