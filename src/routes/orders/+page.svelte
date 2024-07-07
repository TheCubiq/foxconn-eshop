<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { user } from '$lib/user';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  interface Order {
    id: string;
    total: number;
    created_at: string;
  }

  let orders: Order[] = [];
  let authUser;

  onMount(() => {
    user.subscribe(async (value) => {
      authUser = value;

      if (!authUser) {
        // console.log('User not logged in')
        goto('/login');
      } else {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', authUser.id);

        if (!error) {
          orders = data;
        }
      }
    });
  });
</script>

<main>
  <h1>My Orders</h1>

  {#if orders.length > 0}
    <ul>
      {#each orders as order}
        <li>
          <a href={`/orders/${order.id}`}>Order ID: {order.id}</a>
          <p>Total: ${(order.total / 100).toFixed(2)}</p>
          <p>Placed on: {new Date(order.created_at).toLocaleString()}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p>You have no orders.</p>
  {/if}
</main>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 1em;
  }

  a {
    text-decoration: none;
    color: blue;
  }
</style>
