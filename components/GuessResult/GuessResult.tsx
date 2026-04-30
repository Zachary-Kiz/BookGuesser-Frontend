import styles from "./GuessResult.module.css"

interface Guess {
    guess: string;
}

export default function GuessResult({guess}: Guess) {
    return (
        <div className="flex flex-row items-center gap-2 border-(--dark-brown) border-[0.5] rounded-sm pl-2">
            <div className={styles.ex}>&#215;</div>
            <div className="" key={guess}>{guess}</div>
        </div> 
    )
}