<script context="module">
  export async function preload({ path, params, query }) {
    const username = params.username || process.env.DEFAULT_USERNAME;
    const url = `https://api.mapbox.com/styles/v1/${username}?access_token=${
      process.env.MAPBOX_SECRET_TOKEN
    }`;

    const styles = await this.fetch(url)
      .then(r => r.json())
      .then(styles => styles.filter(s => s.visibility === "public"))
      .catch(console.error);

    return { styles };
  }
</script>

<script>
  import { stores } from "@sapper/app";

  const { preloading, page } = stores();
  const { username } = $page.params;

  export let styles = [];
  export let mapbox = [];
</script>

<style>
  :global(body) {
    padding: 2em;
  }
</style>

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
