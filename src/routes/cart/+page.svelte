<script lang="ts">
	import { onMount } from 'svelte';
	import { cart } from '$lib/store';
	import { get } from 'svelte/store';
	import type { CartItem } from '$lib/store';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { PackageX } from 'lucide-svelte';

	let cartItems: CartItem[] = [];
	let total = 0;

	function recalculateTotal(items: CartItem[]) {
		total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	}

	function removeFromCart(productId: string) {
		cart.update((items) => items.filter((item) => item.id !== productId));
		cartItems = get(cart);
		recalculateTotal(cartItems);
	}

	onMount(() => {
		const items = get(cart);
		cartItems = items;
		recalculateTotal(items);

		const unsubscribe = cart.subscribe((value) => {
			cartItems = value;
			recalculateTotal(value);
		});

		return () => unsubscribe();
	});
</script>

<main>
	<section>
		<h1>Your Cart</h1>
		<h3>Total: ${(total / 100).toFixed(2)}</h3>
		<ul>
			{#if cartItems.length}
				{#each cartItems as item (item.name)}
					<li animate:flip={{ duration: 500, easing: quintOut }}>
						<h2>{item.name}</h2>
						<p>{item.quantity}x</p>
						<p>${(item.price / 100).toFixed(2)}</p>
						<button on:click={() => removeFromCart(item.id)}><PackageX /></button>
					</li>
				{/each}
			{:else}
				<li>Your cart is empty.</li>
			{/if}
		</ul>
	</section>
</main>

<style>
	main {
		flex: 1;
		padding: 2em;
    display: flex;
    justify-content: center;
	}

  section {
    flex: 1;
    max-width: 30rem;
  }

	ul {
		list-style: none;
		padding: 0;
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1em;
		/* border: 1px solid #ccc; */
		/* border-radius: var(--border-rad); */
		padding: 0.5em;
		margin-bottom: 1rem;
	}

	li::before {
		content: '';
		flex: 1;
		order: -1;
		height: 1em;
		color: white;
		opacity: 0.8;
		border-bottom: currentColor 2px dotted;
	}

	h2 {
		gap: 1em;
		align-items: baseline;
		order: -2;
		text-transform: capitalize;
	}

	button {
		background-color: #942c2c;
		color: #fff;
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
		border-radius: var(--border-rad);
	}
</style>
