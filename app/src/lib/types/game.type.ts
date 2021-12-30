export enum LetterStatus {
	Unsubmitted = "true-gray-800",
	Correct = "green-700",
	InWord = "yellow-700",
	Incorrect = "red-700"
}

export type Letter = {
	value: string;
	status: LetterStatus;
}

export enum RowStatus {
	Inactive = "INACTIVE",
	InProgress = "IN_PROGRESS",
	Invalid = "INVALID",
	Submitted = "SUBMITTED"
}

export type Row = {
	status: RowStatus;
	letters: Letter[];
}

export enum GameStatus {
	InProgress = "IN_PROGRESS",
	Lost = "LOST",
	Won = "WON"
}

export type Game = {
	status: GameStatus;
	activeRow: number;
	rows: Row[];
}