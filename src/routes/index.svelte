<script>
  import { stores } from "@sapper/app";

  const { preloading, page } = stores();
  const { username } = $page.params;

  export const styles = [
    "mapbox/streets-v11",
    "mapbox/outdoors-v11",
    "mapbox/light-v10",
    "mapbox/dark-v10",
    "mapbox/satellite-v9",
    "mapbox/satellite-streets-v11",
    "mapbox/navigation-preview-day-v4",
    "mapbox/navigation-preview-night-v4",
    "mapbox/navigation-guidance-day-v4",
    "mapbox/navigation-guidance-night-v4"
  ];
</script>

<svelte:head>
  <title>Map Viewer</title>
</svelte:head>

<h1>Styles</h1>

<h2>Mapbox public styles</h2>
<ul>
  {#each styles as style}
    <li>
      <a href="/{style}">{style}</a>
    </li>
  {/each}
</ul>
