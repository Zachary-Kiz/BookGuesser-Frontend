"use client"

import {getTodayPuzzle} from "@/api/todayPuzzle";
import { useEffect, useState } from "react";
import styles from "./Puzzle.module.css"

export default function Today() {

    const [book, setBook] = useState<any>()
    const [error, setError] = useState<any>();
    const [guesses, setGuesses] = useState<Array<string>>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");

    function guessBook() : void {
        setGuesses([...guesses, currentGuess])
        setCurrentGuess("")
    }

    useEffect(() => {
        try {
            getTodayPuzzle().then(setBook).catch((err) => {
                setError(err.message);
            });
        } catch (err) {
            console.error(err);
        }
        
    }, []);

    console.log(currentGuess)

    return (
        <div>
            {book && 
                <div>
                    <div><img src={book.covers[0].imageUrl}/></div>
                    
                </div>
            }
            <input type="text" value={currentGuess} onChange={(e) => setCurrentGuess(e.target.value)}></input>
            <button onClick={() => guessBook()}>Enter</button>
            <div className={styles.puzzleButtons}>
                {guesses?.map(guess => {
                    return <div key={guess}>{guess}</div>
                })}
            </div>
        </div>
    )
}