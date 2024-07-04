<script lang="ts">
  import { onMount } from 'svelte';
  import { cart } from '$lib/store';
  import { get } from 'svelte/store';
  import type { CartItem } from '$lib/store';

  let cartItems: CartItem[] = [];
  let total = 0;

  function recalculateTotal(items: CartItem[]) {
    total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  function removeFromCart(productId: string) {
    cart.update(items => items.filter(item => item.id !== productId));
    cartItems = get(cart);
    recalculateTotal(cartItems);
  }

  onMount(() => {
    const items = get(cart);
    cartItems = items;
    recalculateTotal(items);

    const unsubscribe = cart.subscribe(value => {
      cartItems = value;
      recalculateTotal(value);
    });

    return () => unsubscribe();
  });
</script>

<main>
  <h1>Your Cart</h1>
  <ul>
    {#if cartItems.length}
      {#each cartItems as item}
        <li>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>${(item.price / 100).toFixed(2)}</p>
          <p>Quantity: {item.quantity}</p>
          <button on:click={() => removeFromCart(item.id)}>Remove</button>
        </li>
      {/each}
    {:else}
      <li>Your cart is empty.</li>
    {/if}
  </ul>
  <h3>Total: ${(total / 100).toFixed(2)}</h3>
</main>
