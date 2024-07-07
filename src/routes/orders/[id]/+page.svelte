<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let orderId : string;
  $: orderId = $page.params.id;

  interface OrderItem {
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    name: string;
  }

  let orderItems: OrderItem[] = [];

  $: fetchOrderItems();

  async function fetchOrderItems() {
    const { data: orderItemsData, error } = await supabase
      .from('order_items')
      .select('*, products(name)')
      .eq('order_id', orderId);

    if (error) {
      console.error('Error fetching order items:', error);
      return;
    }

    orderItems = orderItemsData.map(item => ({
      ...item,
      name: item.products.name,
      // image_url: item.products.image_url
    }));
  }
</script>

<main>
  <a href="/orders">Back to orders</a>
  <h1>Order Details</h1>

  {#if orderItems.length > 0}
    <ul>
      {#each orderItems as item}
        <li>
          <!-- <img src={item.image_url} alt={item.name} style="width: 50px; height: 50px;"> -->
          <h2>{item.name}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${(item.price / 100).toFixed(2)}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading order items...</p>
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

  img {
    margin-right: 1em;
  }
</style>
