import { create } from 'zustand';
import { OrderItem } from './types';
import { type Product } from '@prisma/client';

type Store = {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
};

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const newOrder: OrderItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      subtotal: 1 * product.price,
    };

    let items: OrderItem[] = [];

    if (get().order.find((item) => item.id === newOrder.id)) {
      items = get().order.map((item) =>
        item.id === newOrder.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.subtotal * (item.quantity + 1),
            }
          : item
      );
    } else {
      items = [...get().order, newOrder];
    }

    set(() => ({
      order: items,
    }));
  },
}));
