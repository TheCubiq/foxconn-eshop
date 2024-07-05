<script lang="ts">
	import flash from '$lib/assets/models/camera.splinecode?url';

	// import type { PageData } from './$types';
	// import type { Product } from '$lib/store';

	// export let data: PageData; // loaded from page.ts

	// const products: Product[] = data.products || [];

	// const getProducts = (n: number) => {
	// 	return products.slice(0, n);
	// };
</script>

<main>
	<section id="hero">
		<article id="title">
			<h1>Cubiq's Electro</h1>
			<p>Meet your new favorite electronic store!</p>
			<a href="/products">Get Started 🔥</a>
		</article>
		<article id="grid">
			<!-- {#each getProducts(3) as product} -->
			{#each Array(3) as _}
				<div class="container">
					<spline-viewer events-target="global" url={flash} background="transparent"></spline-viewer>
					<menu>
						<a href=" ">see more</a>
					</menu>
				</div>
			{/each}
		</article>
	</section>
</main>

<style>
	main {
		flex: 1;
		display: flex;
		align-items: center;
		background-color: var(--clr-bg);
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
		background: var(--clr-accent);
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
		background: var(--clr-accent);
		position: relative;
		text-align: center;
	}

	.container > spline-viewer {
		transition: 0.3s;
	}

	.container:hover > spline-viewer,
	.container:focus-within > spline-viewer {
		transform: scale(1.1);
	}

	#grid .container:nth-child(1) {
		grid-row: span 2;
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
