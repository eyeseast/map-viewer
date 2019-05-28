<script>
  import { onMount } from "svelte";

  export let segment;

  onMount(() => {
    window.mapboxgl.accessToken = process.env.MAPBOX_PUBLIC_TOKEN;
  });
</script>

<style>

</style>

<slot />
