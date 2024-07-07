<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    thumb_url: string; // Thumbnail image url
    model_url: string; // 3D model url
  }

  let products: Product[] = []; // Initialize with an empty array
  let newProduct: Product = { name: '', description: '', price: 0, thumb_url: '', model_url: '' };
  let thumbnailFileList: FileList | null = null;
  let modelFileList: FileList | null = null;
  let message: string = '';

  async function addProduct() {
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0 || !thumbnailFileList || !modelFileList) {
      message = 'Please fill out all fields correctly.';
      return;
    }

    try {

      // Get the first file from the FileList
      const thumbnailFile = thumbnailFileList[0];
      const modelFile = modelFileList[0];

      // Upload the thumbnail file
      const thumbnailResponse = await supabase.storage.from('thumbnails').upload(`public/${thumbnailFile.name}`, thumbnailFile);
      if (thumbnailResponse.error) throw thumbnailResponse.error;
      const thumbnailUrl = supabase.storage.from('thumbnails').getPublicUrl(`public/${thumbnailFile.name}`).data.publicUrl;
      console.log(thumbnailResponse, thumbnailUrl);

      // Upload the 3D model file
      const modelResponse = await supabase.storage.from('models').upload(`public/${modelFile.name}`, modelFile);
      if (modelResponse.error) throw modelResponse.error;
      const modelUrl = supabase.storage.from('models').getPublicUrl(`public/${modelFile.name}`).data.publicUrl;
      console.log(modelResponse, modelUrl);

      const newProd = {
        ...newProduct,
        thumb_url: thumbnailUrl,
        model_url: modelUrl
      }

      // Save the new product to the database
      const { data, error } = await supabase.from('products').insert(newProd);

      console.log(newProd, error)

      if (error) {
        throw error;
      } else {
        message = 'Product added successfully!';
        newProduct = { name: '', description: '', price: 0, thumb_url: '', model_url: '' };
        thumbnailFileList = null;
        modelFileList = null;
        products = [...products, newProd]; // Update local products list
      }
    } catch (error: Error) {
      message = `Error: ${error.message}`;
    }
  }

  onMount(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) products = data;
  });
</script>

<main>
  <h1>Admin Panel</h1>

  <form on:submit|preventDefault={addProduct}>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={newProduct.name}>
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea id="description" bind:value={newProduct.description}></textarea>
    </div>
    <div>
      <label for="price">Price (in cents):</label>
      <input type="number" id="price" bind:value={newProduct.price} min="0">
    </div>
    <div>
      <label for="thumbnail">Thumbnail:</label>
      <input type="file" id="thumbnail" accept="image/*" bind:files={thumbnailFileList} >
    </div>
    <div>
      <label for="model">3D Model:</label>
      <input type="file" id="model" accept=".splinecode,.spline" bind:files={modelFileList} >
    </div>
    <button type="submit">Add Product</button>
  </form>

  {#if message}
    <p>{message}</p>
  {/if}

  <h2>Current Products</h2>
  <ul>
    {#each products as product}
      <li>
        <img src={product.thumb_url} alt={product.name} style="width: 50px; height: 50px;">
        <strong>{product.name}</strong>: {product.description} - ${(product.price / 100).toFixed(2)}
        <a href={product.model_url} target="_blank">View 3D Model</a>
      </li>
    {/each}
  </ul>
</main>

<style>
  form {
    margin-bottom: 2em;
    text-align: start;
  }

  form div {
    margin-bottom: 1em;
    display: flex;
    column-gap: 1em;
    max-width: 300px;
    align-items: flex-start;
    flex-direction: column;
  }

  label {
    display: block;
  }

  input, textarea, button {
    /* width: 100%; */
    flex: 1;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
  }

  img {
    margin-right: 1em;
    object-fit: cover;
  }
</style>
