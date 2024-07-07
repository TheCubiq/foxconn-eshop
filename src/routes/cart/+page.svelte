<script lang="ts">
	import { onMount } from 'svelte';
	import { cart } from '$lib/store';
	import { get } from 'svelte/store';
	import type { CartItem } from '$lib/store';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { PackageX } from 'lucide-svelte';
	import { fly, } from 'svelte/transition';
	import { transitionFix } from '$lib/utils/helperFunctions';

	let cartItems: CartItem[] = [];
	let total = 0;

	const recalculateTotal = (items: CartItem[]) => {
		total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	};

	const removeFromCart = (productId: string) => {
		cart.update((items) => items.filter((item) => item.id !== productId));
		const cartItems = get(cart);
		recalculateTotal(cartItems);
	};

	const updateQuantity = (productId: string, quantity: number) => {
		// ensure quantity is at least 1
		if (quantity < 1) quantity = 1;
		// remove decimal points
		quantity = Math.floor(quantity);

		cart.update((items) => {
			const item = items.find((item) => item.id === productId);
			if (item) {
				item.quantity = quantity;
			}
			return items;
		});
		const cartItems = get(cart);
		recalculateTotal(cartItems);
	};

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
	<section id="cart">
		<h1>Your Cart</h1>
		<h3>Total: ${(total / 100).toFixed(2)}</h3>
		<ul>
			{#if cartItems.length}
				{#each cartItems as item, idx (item.name)}
					<li
						
						in:fly|global={transitionFix({ x: 100, duration: 1000, delay: idx * 100 + 750})}
						animate:flip={{ duration: 500, easing: quintOut}}
						>
						<h2>{item.name}</h2>
						<div class="input-wrapper">
							<input
								type="number"
								max="999"
								required
								min="1"
								bind:value={item.quantity}
								on:input={() => updateQuantity(item.id, item.quantity)}
							/>
						</div>
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

	/* :global(#app:has(section#cart)) {
		overflow-x: auto;
	} */

	main {
		padding: 2em;
		display: flex;
		justify-content: center;
	}

	section {
		flex: 1;
		max-width: 30rem;
		min-width: 0;
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
		overflow: hidden;
    text-overflow: ellipsis;
		min-width: 3ch;
	}

	input {
		appearance: none;
		-webkit-appearance: none;
		border: none;
		min-width: 3ch;
		/* text-align: end; */
		background: none;
		font-size: 1rem;
		padding: 0.25em;
		field-sizing: content;
		color: var(--clr-text);
	}

	.input-wrapper {
		position: relative;
	}
	.input-wrapper::after {
		content: 'x';
		position: absolute;
		right: 0.6em;
		z-index: -1;
	}

	p {
		overflow: hidden;
    text-overflow: clip;
	}

	button {
		background-color: #942c2c;
		color: #fff;
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
		border-radius: var(--border-rad);
		position: sticky;
		right: 0;
	}
</style>
