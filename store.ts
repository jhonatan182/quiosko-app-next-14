import { create } from 'zustand';
import { OrderItem } from './types';

type Store = {
  order: OrderItem[];
};

export const useStore = create<Store>(() => ({
  order: [],
}));
