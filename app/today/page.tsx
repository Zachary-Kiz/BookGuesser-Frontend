"use client"

import {getTodayPuzzle, searchBooks, debounce} from "@/api/todayPuzzle";
import { useEffect, useMemo, useState } from "react";
import styles from "./Puzzle.module.css"
import { Level } from "@/types/book";

export default function Today() {

    const [book, setBook] = useState<any>()
    const [error, setError] = useState<any>();
    const [guesses, setGuesses] = useState<Array<string>>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [searchRes, setSearchRes] = useState<Array<string>>([])
    const [isGuessed, setIsGuessed] = useState<boolean>(false);

    const bookTitle : string = book?.title;

    const level : Level = isGuessed ? 6 : (guesses.length as Level);

    async function getBookNames(query: string) {
        try {
            const bookNames : string[] = await searchBooks(query);
            setSearchRes(bookNames);
        } catch (err) {
            setError(err)
        }
        
    }

    function checkGuess(guess : string) : void {
        if (bookTitle && guess === bookTitle) {
            setIsGuessed(true);
        }
        setGuesses([...guesses, guess]);
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

    const debouncedSearch = useMemo(
        () =>
            debounce((val: string) => {
                getBookNames(val);
            }, 200),
        []
    );

    return (
        <div>
            {isGuessed && <div>You Win!!</div>}
            {book && 
                <div><img src={book.covers[level].imageUrl}/></div>
                    
            }
            <input list="books" type="text" value={currentGuess} onChange={(e) => {const val = e.target.value; setCurrentGuess(val); debouncedSearch(val)}}></input>
            <div id="books">
                {searchRes.map((title: string) => {
                    return <div onClick={() => checkGuess(title)} key={title}>{title}</div>
                })}
            </div>
            <div className={styles.puzzleButtons}>
                {guesses?.map(guess => {
                    return <div key={guess}>{guess}</div>
                })}
            </div>
        </div>
    )
}