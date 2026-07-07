import { getFriendGuess, getGuess } from "@/app/api/guess";
import { getPastPuzzle } from "@/app/api/todayPuzzle";
import { getUser } from "@/app/api/userServer";
import BookPage from "@/components/BookPage/BookPage";
import { handleGuess, isRefreshToken } from "@/helpers/helper";
import { Guess, PlayerGuess } from "@/types/user";

export default async function Puzzle({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let user = "";
    let guesses : Array<string> = []
    let isGuessed = Guess.Guessing;
    let friendGuesses : PlayerGuess[] | undefined = undefined;
    const book = await getPastPuzzle(id);
    const refreshToken = await isRefreshToken()

    if (refreshToken) {
        const data = await getUser();
        if (data)  {
            user = data['user']
            friendGuesses = await getFriendGuess(id);
        }
        const guess : PlayerGuess | undefined = await getGuess(user, id);
        if (guess) {
            guesses = guess['guesses'];
            isGuessed = handleGuess(guess['guessed'])
        }
    }
    


    return <BookPage book={book} username={user} id={id} guessed={isGuessed} prevGuesses={guesses} friendGuesses={friendGuesses}/>;
}