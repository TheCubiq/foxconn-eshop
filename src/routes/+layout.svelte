<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { transitionFix } from '$lib/utils/helperFunctions';
	import { fly } from 'svelte/transition';

	export let data;

	// const transition = transitionFix({ x: 200, duration: 300, delay: 300 })
	const transition = (duration = 100, out=false, { ...args } = {}) =>
		transitionFix({
			x: 100 * (out ? -1 : 1),
			duration,
      delay: out ? 0 : duration,
      ...args
		});
</script>

<Header />
{#key data.url}
	<div class="page-transition" in:fly|global={transition(750)} out:fly={transition(750, true)}>
		<slot />
	</div>
{/key}

<style>
	.page-transition {
		display: flex;
    overflow: auto;
	}

  .page-transition:nth-child(3) {
    /* display: none; */
  }


</style>
