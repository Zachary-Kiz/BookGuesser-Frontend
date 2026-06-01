import { Guess } from "@/types/user";

export function handleGuess(guessed: boolean) : Guess {
    if (guessed === false) {
        return Guess.Failed;
    } else {
        return Guess.Success;
    }
}