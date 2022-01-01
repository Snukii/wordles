<script context="module" lang="ts">
  export const ssr = false;
  export const prerender = false;
</script>

<script lang="ts">
  import { game, startGame } from "$lib/stores/game.store";
  import Letter from "../lib/Letter.svelte";
</script>

{#if $game}
  <div display="grid" grid="cols-5 rows-6" gap="2">
    {#each $game.rows as row, rowIndex (row)}
      {#each row.letters as letter, letterIndex (rowIndex + "." + letterIndex)}
        <div col="start-{letterIndex}">
          <Letter {letter} />
        </div>
      {/each}
    {/each}
  </div>
{/if}
