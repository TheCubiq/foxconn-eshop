<script lang="ts">
	import { cart } from '$lib/store';
	import { user } from '$lib/user';
	import { Bell, Flame, House, ShoppingBag, ShoppingCart, UserRound } from 'lucide-svelte';

	import Logo from '$lib/assets/CubiqLogo.svelte';
	import pfp from '$lib/assets/images/pfp.webp';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { transitionFix as tFix } from '$lib/utils/helperFunctions';
	import { fly } from 'svelte/transition';

	let authUser = get(user);

	const unsubscribe = user.subscribe((value) => {
		authUser = value;
	});

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

{#snippet userProfile(mobile?: false)}
	{#if authUser}
		<a href="/profile" class="pfp" class:mobile>
			<img src={pfp} alt="pfp" />
		</a>
	{:else}
		<a href="/login" class:mobile>
			<UserRound size="1em" />
		</a>
	{/if}
{/snippet}

{#if loaded}
<header in:fly|global={tFix({ y: -100, duration: 1000, delay: 1500 })}>
		<!-- logo -->
		<Logo />

		<nav class="menu"  in:fly|global={tFix({ y: -100, duration: 1000, delay: 1750 })}>
			<a href="/">
				<House size="1em" />
				<span>Home</span>
			</a>
			<a href="/products">
				<ShoppingBag size="1em" />
				<span>Products</span>
			</a>
			<a href="/products?hot" class="mobile-hide">
				<Flame size="1em" />
				<span>Hot Deals</span>
			</a>
			<a href="/cart" class="mobile">
				<ShoppingCart size="1em" />
				<span>Cart ({$cart.length})</span>
			</a>
			{@render userProfile(true)}
		</nav>

		<nav class="user" in:fly|global={tFix({ y: -100, duration: 1000, delay: 2000 })}>
			<a href="/">
				<Bell size="1em" />
			</a>
			<a href="/cart">
				<ShoppingCart size="1em" />
				Cart ({$cart.length})
			</a>
			{@render userProfile()}
		</nav>
	</header>
	{/if}

<style>
	:root {
		--bg-img: 'https://i.imgur.com/20Q7JDm.png';
	}

	:global(header > svg),
	header > nav.user {
		visibility: hidden;
		width: 0;
		padding: 0;
	}

	header {
		margin-inline: var(--card-padding);
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		/* justify-items: center; */
		align-items: center;

		position: relative;
	}

	header > nav {
		--p: 1em 2em;

		/* background-color: color-mix(
          in lab, 
          var(--clr-bg) 80%, 
          transparent
      ); */
		background-color: var(--clr-primary);

		border-radius: var(--border-rad);
		padding: var(--p);

		backdrop-filter: blur(12px);
		opacity: 0.9;

		gap: 1.5em;
	}

	a {
		display: flex;
		align-items: center;
		gap: 0.3em;
		text-decoration: none;
		color: var(--clr-bg);
		opacity: 0.7;
		transition: 0.2s;
	}

	a:hover {
		/* color: var(--clr-primary); */
		opacity: 1;
	}

	a.pfp {
		/* background-image: var(--bg-img); */
		background-size: cover;
		background-position: center;

		height: 1.5em;
		aspect-ratio: 1;

		border-radius: 50%;
		overflow: hidden;
	}

	a.pfp > img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	a span,
	.mobile-hide {
		display: none;
	}

	header {
		z-index: 999999;
		transform: translateZ(0px);

		position: fixed;
		left: 0;
		right: 0;

		--outset: 2em;

		bottom: var(--outset);

		margin: 0;
	}

	/* subtle shadow for phone nav */
	header::before {
		content: '';
		position: absolute;
		inset: 0;
		bottom: calc(var(--outset) * -1);
		/* background-image: var(--bg-img); */
		/* background-size: cover; */
		/* background-position: center; */
		/* background: black; */
		z-index: -1;

		background: linear-gradient(#0000 0%, #000 100%);
		opacity: 0.7;
		/* background: #000; */

		top: -5em;
		/* filter: brightness(0.5); */
		z-index: -1;
	}

	@media (min-width: 48rem) {
		header {
			position: sticky;
			top: 0;
			bottom: unset;
			white-space: nowrap;
			gap: 1em;
			filter: drop-shadow(2px 4px 6px #0004);
		}

		header::before {
			display: none;
		}

		:global(header > svg),
		header > nav.user {
			visibility: visible;
			width: auto;
			padding: var(--p);
		}

		a span,
		.mobile-hide {
			display: inline;
		}

		a.mobile {
			display: none;
		}
	}

	nav.user {
		justify-self: end;
	}

	svg {
		justify-self: start;
	}

	nav {
		display: flex;
		list-style: none;
		font-size: 1rem;
	}

	nav.user > :not(:nth-child(1))::before {
		content: '|';
		position: absolute;
		margin-inline-start: -0.8em;
		line-height: 0.5em;
		color: var(--clr-bg);
		pointer-events: none;
		opacity: 0.5;
	}
</style>
