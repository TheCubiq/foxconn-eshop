<script lang="ts">
  import { cart } from '$lib/store';
  import type { PageData } from './$types';
  import type { CartItem, Product as ProductType } from '$lib/store';

	import Product from '$lib/components/Product.svelte';
	import { fade, fly } from 'svelte/transition';
	import { transitionFix } from '$lib/utils/helperFunctions';

  export let data: PageData; // loaded from page.ts

  const products: ProductType[] = data.products || [];

  function addToCart(product: ProductType) {
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
</script>

<main>
  <h1>Products</h1>
  <div class="product-grid">
    {#each products as product, idx (product.id)}
      <div in:fly|global={transitionFix({ y: 100, duration: 1000, delay: idx * 100 + 750 })}>
        <Product {product}/>
      </div>
    {/each}
  </div>
</main>

<style>
  .product-grid {
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
</style>
