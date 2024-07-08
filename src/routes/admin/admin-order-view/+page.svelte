<script lang="ts">
  import { onMount } from 'svelte';
  import { loadOrders, cancelOrder } from './orderActions';

  let orders: any[] = [];
  let message = '';

  onMount(async () => {
    const { data, error } = await loadOrders();
    if (!error) {
      orders = data || [];
    }
  });

  async function handleCancelOrder(orderId: string) {
    const result = await cancelOrder(orderId);
    if (result.error) {
      message = result.error;
    } else {
      message = result.message;
      orders = orders.filter(order => order.id !== orderId);
    }
  }
</script>

<main>
  <h1>Orders</h1>
  <p>{message}</p>
  <ul>
    {#each orders as order}
      <li>
        <strong>Order ID:</strong> {order.id}
        <button on:click={() => handleCancelOrder(order.id)}>Cancel Order</button>
      </li>
    {/each}
  </ul>
</main>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 1em;
  }

  button {
    margin-top: 0.5em;
  }
</style>
