<script>
  import { onMount } from "svelte";

  export let segment;

  onMount(() => {
    //window.mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;
  });
</script>

<slot />
