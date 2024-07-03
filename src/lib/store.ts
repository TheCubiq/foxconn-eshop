import { writable } from 'svelte/store';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export const cart = writable<CartItem[]>([]);
