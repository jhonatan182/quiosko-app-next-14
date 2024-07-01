import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

const orderSchema = z.object({
  username: z.string().min(2, {
    message: 'no pasaste perror',
  }),
});

export default function FormCreateOrder() {
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      username: '',
    },
  });

  const handleCreateOrder = () => {
    createOrder();
  };

  return (
    <Form {...form}>
      <form
        className="w-full mt-10 space-y-5"
        onSubmit={form.handleSubmit(handleCreateOrder)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  error={form.formState.errors.username}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
