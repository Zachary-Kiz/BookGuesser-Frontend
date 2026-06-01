import { getGuess } from "@/api/guess";
import { getTodayPuzzle } from "@/api/todayPuzzle";
import { getUser } from "@/api/userServer";
import BookPage from "@/components/BookPage/BookPage";
import { handleGuess } from "@/helpers/helper";
import { Guess, PlayerGuess } from "@/types/user";

export default async function Today() {
    let user = "";
    let guesses : Array<string> = [];
    let isGuessed : Guess = Guess.Guessing;
    const data1 = await getTodayPuzzle();
    const book = data1['book'];
    const puzzleId : string = String(data1['puzzleId'])
    const data = await getUser();
    if (data) {
        user = data['user']
        const guess : PlayerGuess | undefined = await getGuess(user, puzzleId);
        if (guess) {
            guesses = guess['guesses'];
            isGuessed = handleGuess(guess['guessed']);
        }
    }

    return <BookPage book={book} username={user} id={puzzleId} guessed={isGuessed} prevGuesses={guesses}/>
    
}