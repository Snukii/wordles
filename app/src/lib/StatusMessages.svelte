<script>
  import { game, startGame, word } from "./stores/game.store";

  import { GameStatus, RowStatus } from "./types/game.type";

  $: row = $game.rows[$game.activeRow];
</script>

<div display="flex" text="true-gray-400" mx="auto" p="2">
  {#if $game.status === GameStatus.Won}
    <p text="5xl light-500">You guessed the word: {$word.toUpperCase()}</p>
  {:else if $game.status === GameStatus.Lost}
    <p text="5xl light-500">
      You didn't guess the word: {$word.toUpperCase()}
    </p>
  {:else if row.status === RowStatus.Invalid}
    <p text="5xl light-500">That's not a valid word!</p>
  {/if}
</div>
<slot />
<div display="flex" text="true-gray-400" mx="auto" p="2" cursor="hover:pointer">
  {#if $game.status === GameStatus.Won}
    <p text="5xl light-500" on:click={() => startGame()}>New Word</p>
  {:else if $game.status === GameStatus.Lost}
    <p text="5xl light-500" on:click={() => startGame()}>Try again!</p>
  {:else if row.status === RowStatus.Invalid}
    <p opacity="0">silly fix lol</p>
  {/if}
</div>
