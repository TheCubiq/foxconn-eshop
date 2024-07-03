<script lang="ts">
  import { cart } from '$lib/store';
</script>

<nav>
  <a href="/products">Products</a>
  <a href="/cart">Cart ({$cart.length})</a>
</nav>

<slot />
