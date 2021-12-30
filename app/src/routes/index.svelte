<script context="module" lang="ts">
  export const ssr = false;
  export const prerender = false;

  export async function load({}) {
    await startGame();

    return {
      status: 200,
    };
  }
</script>

<script lang="ts">
  import {
    game,
    getWord,
    guess,
    LetterStatus,
    startGame,
    word,
  } from "$lib/stores/game.store";
  import { GameStatus, RowStatus } from "$lib/types/game.type";
  import Letter from "./Letter.svelte";

  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  $: row = $game.rows[$game.activeRow];
  $: slot = row.letters.find((ltr) => ltr.value === "");
  $: slotIndex = row.letters.findIndex((ltr) => ltr.value === "");

  const checkLetters = async () => {
    for (const i in row.letters) {
      const letter = row.letters[i];
      if (letter.value === $word[i]) {
        letter.status = LetterStatus.Correct;
      } else if ($word.includes(letter.value)) {
        letter.status = LetterStatus.InWord;
      } else {
        letter.status = LetterStatus.Incorrect;
      }
    }
  };

  const handleKeydown = async (event) => {
    const key = event.key;

    if ($game.status === (GameStatus.Won || GameStatus.Lost)) {
      if (key === "r") {
        await startGame();
      }
      return;
    }

    if (!slot) {
      if (key === "Enter") {
        const res = await fetch(`/check.${$guess}`);
        if (res.ok) {
          checkLetters();
          if ($guess === $word) {
            $game.status = GameStatus.Won;
          } else if ($game.activeRow === 5) {
            $game.status = GameStatus.Lost;
          } else {
            $game.activeRow++;
          }
        } else {
          row.status = RowStatus.Invalid;
        }
      }
    }

    if (key === "Backspace") {
      if (slot) {
        $game.rows[$game.activeRow].letters[slotIndex - 1].value = "";
      } else {
        row.letters[4].value = "";
      }
      game.set($game);
    }

    if (alphabet.indexOf(key) === -1) return;

    if (slot) slot.value = key;

    game.set($game);
  };
</script>

<svelte:head>
  <title>Wordles</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div
  display="flex"
  flex="col"
  align="items-center"
  justify="content-center"
  h="100vh"
>
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
    <div
      display="flex"
      text="true-gray-400"
      mx="auto"
      p="2"
      cursor="hover:pointer"
    >
      {#if $game.status === GameStatus.Won}
        <p text="5xl light-500" on:click={() => startGame()}>New Word</p>
      {:else if $game.status === GameStatus.Lost}
        <p text="5xl light-500" on:click={() => startGame()}>Try again!</p>
      {:else if row.status === RowStatus.Invalid}
        <p text="5xl light-500" opacity="0">silly fix lol</p>
      {/if}
    </div>
  {/if}
</div>
