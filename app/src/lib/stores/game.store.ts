import type { Game, Letter, Row } from '$lib/types/game.type';
import { GameStatus, RowStatus } from '$lib/types/game.type';
import { derived, writable } from 'svelte/store';

export const game = writable<Game>(null);
export const word = writable<string>(null);

export const guess = derived(
    game,
    $game => {
        if($game) {
        const guess = [];
        for (const letter of $game?.rows[$game?.activeRow]?.letters ) {
            guess.push(letter.value)
        }
        return guess.join("");
    }
    }
)

export enum LetterStatus {
	Unsubmitted = "true-gray-800",
	Correct = "green-700",
	InWord = "yellow-700",
	Incorrect = "red-700"
}

export const startGame = async (): Promise<void> => {
    const rows: Row[] = [];

    for (let i = 0; i < 6; i++) {
        const letters: Letter[] = [];
        for (let i = 0; i < 5; i++) {
            const letter: Letter = {
                value: "",
                status: LetterStatus.Unsubmitted
            }
            letters.push(letter);
        }

        const row: Row = {
            status: RowStatus.Inactive,
            letters,
        }
        rows.push(row);
    }

    const gameBoard:Game = {
        status: GameStatus.InProgress,
        activeRow: 0,
        rows: rows
    };

    gameBoard["rows"] = rows;

    await getWord();
    game.set(gameBoard)
}

export const getWord = async (): Promise<void> => {
    const res = await fetch('/word');
    const json = await res.json()
    console.log(json.word)
    word.set(json.word)
}