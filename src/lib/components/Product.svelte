<script lang="ts">
  import { cart } from '$lib/store';
	import type { CartItem, Product, Product as ProductType } from "$lib/store";
	import cam from '$lib/assets/models/camera.splinecode?url';
	import { derived, get, writable } from 'svelte/store';
	import { onMount } from 'svelte';

  export let product: ProductType;

  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.`;

  
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

  const initialStock = product.stock ? product.stock.quantity : 0;
  let stock = writable(initialStock);

  onMount(() => {

    
    const calculateStock = derived(
      [cart],
      ([$cart]) => {
        const cartItem: CartItem | undefined = $cart.find(item => item.id === product.id);
        return initialStock - (cartItem ? cartItem.quantity : 0);
      }
    );
    
    const unsubscribe = calculateStock.subscribe(value => {
      stock.set(value);
    });
    
    return () => {
      unsubscribe();
    };
  })

</script>

<div class="product">
  <div class="container">
    <!-- <spline-viewer events-target="global" url={product.model_url || cam}></spline-viewer> -->
    <img src={product.thumb_url} alt={product.name} style="width: 100%; height: 100%; object-fit: cover;">
  </div>
  <div class="info-wrapper">
    <h2>{product.name}</h2>
    <div class="details">
      <span>${(product.price / 100).toFixed(2)}</span>
      <!-- <span>{product.stock?.quantity || 99} in stock</span> -->
      {#if $stock > 0}
        <span> {$stock} in stock </span>
      {/if}
    </div>
    <p>{product.description}</p>
    <!-- <p class="desc">{lorem}</p> -->
      <button on:click={() => addToCart(product)}
        disabled={$stock <= 0}
        >
        {#if $stock > 0}
          Add to Cart
        {:else}
          Out of stock
        {/if}
      </button>
  </div>
</div>

<style>
  .product {
    display: grid;
    grid-template-rows: 1fr 1fr;
    /* gap: 1rem; */
    border: 1px solid #ccc;
    /* background: var(--clr-primary); */
    color: var(--clr-bg);
    
    overflow: hidden;
    
    height: 30rem;
    
    /* --clr-primary: limegreen; */
    
    --card-rad: 1rem;
    border-radius: var(--card-rad);

    --corner-rad: 4rem;
  }

  p {
    overflow: hidden;
    max-height: 4.5em;
    max-height: 3lh;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }

  .product .info-wrapper {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    text-align: start;
    background: var(--clr-primary);
    position: relative;

    border-radius: 1rem;
    border-start-end-radius: var(--corner-rad);
    border-start-start-radius: 0;
    filter: drop-shadow(10px -30px 1.5rem #0004);
  }

  .info-wrapper::before {
    content: '';
    position: absolute;
    --smooth: 1px;

    top: calc(-1 * var(--corner-rad) + var(--smooth) * .5);
    left: 0;
    left: calc(var(--smooth) * -1);


    width: var(--corner-rad);
    height: var(--corner-rad);
    color: var(--clr-primary);
    background: radial-gradient(100% 100% at 100% 0%, transparent calc(100% - var(--smooth)), currentColor 100%);
  }

  .container {
    width: 100%;
    /* background: #f0f0f0; */
    overflow: hidden;
    margin-block-end: calc(var(--corner-rad) * -1);
  }


  .details {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-weight: bold;
  }

  h2 {
    text-transform: capitalize;
  }

  button {
    transition: 0.4s;
    cursor: pointer;
    background: var(--clr-bg);
    color: var(--clr-text);
    padding: 0.5em 1em;
    border-radius: 1em;
    text-decoration: none;
    display: inline-block;
    border: none;
    font-size: 1rem;
    box-shadow: 2px 4px 16px #0008;
    margin-top: auto;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:active {
    transition-duration: .1s;
    transform: scale(0.95);
  }

  .product .container > * {
		transition: 0.3s;
    /* filter: brightness(0.7) grayscale(1) sepia(1) hue-rotate(220deg); */
	}

	.product:hover .container > *,
	.product:not(:has(+ :hover)):focus-within .container > * {
		transform: scale(1.1);
	}


</style>