<script lang="ts">
	import { onMount } from "svelte";
  import { Application as SplineRuntime } from "@splinetool/runtime";


  export let url = "default";

  let canvas;

  let app : SplineRuntime;

  const loadScene = () => {
    app = new SplineRuntime(canvas);
    app.load(url).then(() => {
      app.setBackgroundColor("transparent");
      app.setGlobalEvents(true);
      // get eventManager(): any;
      // console.log(app);
    })
  };

  onMount(() => {
    loadScene()

    return () => {
      // spline runtime actually doesn't lose context even on app.dispose()
      // so force it with access to threejs renderer through app._renderer
      app._renderer?.forceContextLoss();
      app.dispose();
    }
  });
</script>

<canvas bind:this={canvas} id="spline-viewer"></canvas>
