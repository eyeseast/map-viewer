<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";

  const { page, session } = stores();
  const { params } = $page;

  let container;
  let map;
  let center;
  let zoom;

  let style;

  $: hash =
    center && zoom
      ? `${center.lat.toFixed(5)}/${center.lng.toFixed(5)}/${zoom.toFixed(2)}`
      : "";

  onMount(() => {
    window.mapboxgl.accessToken = $session.MAPBOX_PUBLIC_TOKEN;

    if (window.location.hash !== "") {
      const [lat, lng, z] = location.hash.slice(1).split("/");
      center = { lat: +lat, lng: +lng };
      zoom = +z;
    }

    const options = {
      container,
      style: `mapbox://styles/${params.username}/${params.style}`
    };

    if (center && zoom) {
      options.center = center;
      options.zoom = zoom;
    }

    map = new mapboxgl.Map(options);

    map.addControl(
      new MapboxGeocoder({
        accessToken: $session.MAPBOX_PUBLIC_TOKEN,
        mapboxgl,
        marker: false,
        collapsed: false,
        clearAndBlurOnEsc: true,
        clearOnBlur: false
      }),
      "top-left"
    );

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.GeolocateControl());

    map.on("styledata", e => {
      style = map.getStyle();
    });

    map.on("moveend", e => {
      center = map.getCenter();
      zoom = map.getZoom();
      hash &&
        window.location.replace(
          `${window.location.origin}${window.location.pathname}#${hash}`
        );
    });

    window.map = map;

    return () => map.remove();
  });
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
</style>

<svelte:head>
  <title>{style ? style.name : 'Map Viewer'}</title>
</svelte:head>

<div id="map" bind:this={container} />
