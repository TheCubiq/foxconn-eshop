<script lang="ts">
	import { transitionFix as tFix } from '$lib/utils/helperFunctions';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import type { PageData } from './$types';
	import type { Product } from '$lib/store';
	import SplineViewer from '$lib/components/SplineViewer.svelte';

	export let data: PageData; // loaded from page.ts

	const products: Product[] = data.products || [];

	const getProducts = (n: number) => {
		return products.slice(0, n);
	};

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

<main>
	{#if loaded}
		<section id="hero" out:fly={tFix({ y: -100, duration: 1500 })}>
			<article id="title" in:fly|global={tFix({ x: 100, duration: 1500, delay: 750 })}>
				<h1>Cubiq's Electro</h1>
				<p>Meet your new favorite electronic store!</p>
				<a href="/products">Get Started 🔥</a>
			</article>
			<article id="grid" in:fly|global={tFix({ x: -100, duration: 1500, delay: 1000 })}>
				{#each getProducts(3) as product}
				<!-- {#each Array(3) as _} -->
					<div class="container">
						<div class="spline-wrapper">
							<!-- <spline-viewer events-target="global" url={product.model_url} background="transparent"></spline-viewer> -->
							 <SplineViewer url={product.model_url} />
						</div>
						<menu>
							<a href=" ">see more</a>
						</menu>
					</div>
				{/each}
			</article>
		</section>
	{/if}
</main>

<style>
	main {
		display: flex;
		align-items: center;
		/* padding: 1.5rem; */
		column-gap: var(--spacing);
		row-gap: var(--spacing-half);
		max-width: 100rem;

		margin-bottom: 5rem;
	}

	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: start;
		gap: 2em;
	}

	#title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-inline: 25%;
		text-align: start;
	}

	h1 {
		font-size: 2.6rem;
	}

	p {
		margin-bottom: 1.25em;
	}

	#title a {
		padding: 0.5em 1em;
		border-radius: 1em;
		background: var(--clr-primary);
		color: var(--clr-bg);
		text-decoration: none;
		text-align: center;
	}

	#grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: 2em;
		height: 50vh;
		min-height: 20rem;
		max-height: 30rem;
	}

	.container {
		border-radius: 2em;
		overflow: hidden;
		background: var(--clr-primary);
		position: relative;
		text-align: center;
	}

	.container .spline-wrapper {
		transition: 0.3s;
	}

	.container:hover .spline-wrapper,
	.container:focus-within .spline-wrapper {
		transform: scale(1.1);
	}

	#grid .container:nth-child(1) {
		grid-row: span 2;
	}

	.spline-wrapper {
		height: 100%;
		pointer-events: none;
	}

	menu {
		position: absolute;
		bottom: 25%;
		inset-inline: 0;
		transition: 0.4s;
	}

	.container a {
		opacity: 0;
		transition: 0.4s;
		background: var(--clr-bg);
		color: var(--clr-text);
		padding: 0.5em 1em;
		border-radius: 1em;
		text-decoration: none;
		transform: translateY(1em);
		display: inline-block;
		box-shadow: 2px 4px 16px #0008;
	}

	.container:hover a,
	.container:focus-within a {
		opacity: 1;
		transform: translateY(0em);
	}

	@media (min-width: 48rem) {
		section {
			grid-auto-flow: column;
			grid-auto-columns: 1fr;
			display: grid;
			align-items: center;
		}

		main {
			margin-bottom: 0;
		}
	}
</style>
