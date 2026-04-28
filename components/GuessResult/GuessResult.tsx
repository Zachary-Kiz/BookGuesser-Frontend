import styles from "./GuessResult.module.css"

interface Guess {
    book: string;
    guess: string;
}

export default function GuessResult({book, guess}: Guess) {
    const isCorrect = book === guess;
    return (
        <div className="flex flex-row items-center gap-2 border-(--dark-brown) border-[0.5] rounded-sm pl-2">
            {isCorrect && <div className={styles.check}>&#x2714;</div>}
            {!isCorrect && <div className={styles.ex}>&#215;</div>}
            <div className="" key={guess}>{guess}</div>
        </div>
            
    )
}