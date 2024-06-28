'use client';

import { useStore } from '@/store';
import { Button } from '../ui/button';
import { Product } from '@prisma/client';

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder);

  return (
    <Button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase"
      onClick={() => addToOrder(product)}
    >
      Agregar
    </Button>
  );
}
