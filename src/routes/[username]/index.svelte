<script context="module">
  export async function preload({ path, params, query }) {
    const url = `https://api.mapbox.com/styles/v1/${
      params.username
    }?access_token=${process.env.MAPBOX_SECRET_TOKEN}`;

    const styles = await this.fetch(url)
      .then(r => r.json())
      .then(styles => styles.filter(s => s.visibility === "public"))
      .catch(console.error);

    const mapbox = await this.fetch(
      `https://api.mapbox.com/styles/v1/mapbox?access_token=${
        process.env.MAPBOX_SECRET_TOKEN
      }`
    )
      .then(r => r.json)
      .catch(console.error);

    return { styles, mapbox };
  }
</script>

<script>
  import { stores } from "@sapper/app";

  const { preloading, page } = stores();
  const { username } = $page.params;

  export let styles = [];
  export let mapbox = [];
</script>

<svelte:head>
  <title>Public styles by {username}</title>
</svelte:head>

<h1>Styles</h1>

<h2>{username}</h2>
<ul>
  {#each styles as style}
    <li>
      <a href="/{style.owner}/{style.id}">{style.name}</a>
    </li>
  {/each}
</ul>

<h2>Mapbox</h2>
<ul>
  {#each mapbox as style}
    <li>
      <a href="/{style.owner}/{style.id}">{style.name}</a>
    </li>
  {/each}
</ul>
