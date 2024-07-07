<script lang="ts">
  import type { PageData } from './$types';
  import type { Product as ProductType } from '$lib/store';

	import Product from '$lib/components/Product.svelte';
	import { fade, fly } from 'svelte/transition';
	import { transitionFix } from '$lib/utils/helperFunctions';

  export let data: PageData; // loaded from page.ts

  const products: ProductType[] = data.products || [];
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
