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
  import Board from "./Board.svelte";

  import StatusMessages from "$lib/StatusMessages.svelte";

  import {
    game,
    guess,
    LetterStatus,
    startGame,
    word,
  } from "$lib/stores/game.store";
  import { GameStatus, RowStatus } from "$lib/types/game.type";
  import Letter from "../lib/Letter.svelte";

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
  <StatusMessages>
    <Board />
  </StatusMessages>
</div>
