export interface SignUpError {
    username: string;
    email: string;
    password: string;
    rePass: string;
    exists: string;
}

export interface SignUpData {
    username: string;
    email: string;
    password: string;
    roles: string;
}

export interface LoginError {
    username: string;
    password: string;
    exists: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface PlayerGuess {
    guessed : boolean;
    guesses : string[];
    puzzleId : number;
    username : string;
}

export enum Guess {
    Guessing,
    Success,
    Failed
}