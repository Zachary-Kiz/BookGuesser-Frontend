import GuessDisplay from "../GuessDisplay/GuessDisplay";

interface FriendResultType {
    username: string;
    correctGuess : number;
    bookTitle : string;
}

export default function FriendResult({username, correctGuess, bookTitle} : FriendResultType) {

    return (
        <div className=" w-11/12 flex flex-col items-center gap-3 py-3 border-t-(--dark-brown) border-t-1">
            {username}
            <GuessDisplay correctGuess={correctGuess} bookTitle={bookTitle}/>
        </div>
    )
}