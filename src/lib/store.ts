import { writable } from 'svelte/store';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;

  stock: {
    quantity: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  model_url: string;
  image_url: string;
  thumb_url: string;

  stock: {
    quantity: number;
  };
}

// Helper functions to load and save cart items from/to localStorage
function loadCartItems(): CartItem[] {
  if (typeof localStorage !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
}

function saveCartItems(cartItems: CartItem[]) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
}

// Initialize the cart with items from localStorage, if available
const initialCart = loadCartItems();

// Create a writable store for the cart
export const cart = writable<CartItem[]>(initialCart);

// Subscribe to cart changes and save them to localStorage
cart.subscribe((value) => {
  saveCartItems(value);
});