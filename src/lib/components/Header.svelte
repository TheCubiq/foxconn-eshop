<script lang="ts">
  import { cart } from '$lib/store';

	import { Bell, Flame, House, ShoppingBag, ShoppingCart } from 'lucide-svelte';

	import Logo from '$lib/assets/CubiqLogo.svelte';
  import pfp from '$lib/assets/images/pfp.webp';
</script>

<header>
	<!-- logo -->
  <Logo />

	<nav class="menu">
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
    <a href="/" class="pfp mobile">
			<img src={pfp} alt="pfp" />
		</a>

	</nav>

	<nav class="user">
		<a href="/">
			<Bell size="1em" />
		</a>
    <a href="/cart">
      <ShoppingCart size="1em" />
      Cart ({$cart.length})
    </a>
		<a href="/" class="pfp">
			<img src={pfp} alt="pfp" />
		</a>
	</nav>
</header>

<style>
	:root {
		--bg-img: 'https://i.imgur.com/20Q7JDm.png';
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
		/* background-color: color-mix(
          in lab, 
          var(--clr-bg) 80%, 
          transparent
      ); */
		background-color: var(--clr-accent);

		border-radius: var(--border-rad);
		padding: 1em 2em;

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
    opacity: .7;
    transition: .2s;
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

	:global(header > svg),
	header > nav.user {
		visibility: hidden;
		width: 0;
	}

	@media (min-width: 48rem) {
		header {
			position: sticky;
			top: 0;
			bottom: unset;
      white-space: nowrap;
      gap: 1em;
		}

		header::before {
			display: none;
		}

		:global(header > svg),
		header > nav.user {
			visibility: visible;
			width: auto;
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
