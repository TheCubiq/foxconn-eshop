<script lang="ts">
  import { cart } from '$lib/store';
  import type { PageData } from './$types';
  import type { CartItem } from '$lib/store';
  import '@splinetool/viewer';

  import cam from '$lib/assets/models/camera.spline?url';

  export let data: PageData; // loaded from page.ts

  const products: Product[] = data.products || [];

  function addToCart(product: Product) {
    cart.update(items => {
      const existing = items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        const newItem: CartItem = { ...product, quantity: 1 };
        items.push(newItem);
      }
      return items;
    });
  }

  interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
  }
</script>

<main>
  <h1>Products</h1>
  <div class="product-grid">
    {#each products as product}
      <div class="product">
        <div class="container">
          <spline-viewer events-target="global" url={cam}></spline-viewer>
        </div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>${(product.price / 100).toFixed(2)}</p>
        <button on:click={() => addToCart(product)}>Add to Cart</button>
      </div>
    {/each}
  </div>
</main>

<style>
  .product-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .product {
    border: 1px solid #ccc;
    padding: 1rem;
    width: calc(33.333% - 1rem);
    box-sizing: border-box;
  }
</style>
