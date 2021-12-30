<script context="module" lang="ts">
  export const prerender = false;
  export const ssr = false;
</script>

<script lang="ts">
  import type { Letter, Row } from "$lib/types/game.type";

  export let letter: Letter;
</script>

<div
  display="flex"
  text="6xl light-500"
  h="5rem"
  w="5rem"
  justify="content-center"
  align="items-center"
  class={"bg-" + letter.status}
>
  {letter?.value?.toUpperCase()}
</div>
