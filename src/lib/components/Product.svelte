<script lang="ts">
	import type { Product as ProductType } from "$lib/store";
	import cam from '$lib/assets/models/camera.splinecode?url';

  export let product: ProductType;

  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.`;

</script>

<div class="product">
  <div class="container">
    <spline-viewer events-target="global" url={product.model_url || cam}></spline-viewer>
  </div>
  <div class="info-wrapper">
    <h2>{product.name}</h2>
    <div class="details">
      <span>${(product.price / 100).toFixed(2)}</span>
      <span>{product.stockCount || 0} in stock</span>
    </div>
    <!-- <p>{product.description}</p> -->
    <p class="desc">{lorem}</p>
  </div>
  <!-- <button on:click={() => addToCart(product)}>Add to Cart</button> -->
</div>

<style>
  .product {
    display: grid;
    grid-template-rows: 1fr 1fr;
    /* gap: 1rem; */
    border: 1px solid #ccc;
    /* background: var(--clr-primary); */
    color: var(--clr-bg);
    
    overflow: hidden;
    
    height: 30rem;
    
    /* --clr-primary: limegreen; */
    
    --card-rad: 1rem;
    border-radius: var(--card-rad);

    --corner-rad: 4rem;
  }

  p {
    overflow: hidden;
    max-height: 4.5em;
    max-height: 3lh;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }

  .product .info-wrapper {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    text-align: start;
    background: var(--clr-primary);
    position: relative;

    border-radius: 1rem;
    border-start-end-radius: var(--corner-rad);
    border-start-start-radius: 0;
    filter: drop-shadow(10px -30px 1.5rem #0004);
  }

  .info-wrapper::before {
    content: '';
    position: absolute;
    --smooth: 1px;

    top: calc(-1 * var(--corner-rad) + var(--smooth) * .5);
    left: 0;
    left: calc(var(--smooth) * -1);


    width: var(--corner-rad);
    height: var(--corner-rad);
    color: var(--clr-primary);
    background: radial-gradient(100% 100% at 100% 0%, transparent calc(100% - var(--smooth)), currentColor 100%);
  }

  .container {
    width: 100%;
    /* background: #f0f0f0; */
    overflow: hidden;
    margin-block-end: calc(var(--corner-rad) * -1);
  }


  .details {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-weight: bold;
  }

  h2 {
    text-transform: capitalize;
  }

</style>