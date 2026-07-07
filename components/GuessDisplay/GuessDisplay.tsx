interface GuessDisplayType {
    correctGuess : number;
    bookTitle :  string;
}

import styles from "./GuessDisplay.module.css"


export default function GuessDisplay({correctGuess, bookTitle} : GuessDisplayType) {

    return (
        <div className="flex flex-row gap-2 items-center">
            {Array(6).fill(null).map((elem, index) => {             
                return index < correctGuess ? 
                    <div key={`${bookTitle}_${index}`} className={styles.incorrectGuess}></div> 
                    : index > correctGuess ? 
                    <div key={`${bookTitle}_${index}`} className={styles.notGuess}></div> 
                    : 
                    <div key={`${bookTitle}_${index}`} className={styles.correctGuess}></div>
            })}
        </div>
    )
}