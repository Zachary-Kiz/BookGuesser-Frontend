import { getGuess } from "@/app/api/guess";
import { getTodayPuzzle } from "@/app/api/todayPuzzle";
import BookPage from "@/components/BookPage/BookPage";
import { handleGuess, isRefreshToken } from "@/helpers/helper";
import { Guess, PlayerGuess } from "@/types/user";
import { getUser } from "../api/userServer";
import { cookies } from "next/headers";

export default async function Today() {
    let user = "";
    let guesses : Array<string> = [];
    let isGuessed : Guess = Guess.Guessing;
    const data1 = await getTodayPuzzle();
    const book = data1['book'];
    const puzzleId : string = String(data1['puzzleId'])
    const refreshToken = await isRefreshToken()
    if (refreshToken) {
        const data = await getUser()
        if (data) {
            user = data['user']
            const guess : PlayerGuess | undefined = await getGuess(user, puzzleId);
            if (guess) {
                guesses = guess['guesses'];
                isGuessed = handleGuess(guess['guessed']);
            }
        }
    }
    

    return <BookPage book={book} username={user} id={puzzleId} guessed={isGuessed} prevGuesses={guesses}/>
    
}