"use client"

import { searchBooks, debounce} from "@/api/todayPuzzle";
import { useMemo, useState } from "react";
import styles from "./BookPage.module.css"
import { Book, Level } from "@/types/book";
import GuessResult from "@/components/GuessResult/GuessResult";
import BookInfo from "@/components/BookInfo/BookInfo";

type BookPageType = {
    book: Book;
}

export default function BookPage({book} : BookPageType) {

    const [guesses, setGuesses] = useState<Array<string>>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [searchRes, setSearchRes] = useState<Array<string>>([])
    const [isGuessed, setIsGuessed] = useState<boolean>(false);

    const bookTitle : string = book?.title;
    const displayBooks = searchRes.length !== 0;
    const level : Level = isGuessed ? 6 : (guesses.length as Level);

    async function getBookNames(query: string) {
        if (query.length <= 3) return;
        try {
            const bookNames : string[] = await searchBooks(query);
            setSearchRes(bookNames);
        } catch (err) {
            console.error(err)
        }
        
    }

    function checkGuess(guess : string) : void {
        if (bookTitle && guess === bookTitle) {
            setIsGuessed(true);
        }
        setGuesses([...guesses, guess]);
        setCurrentGuess("");
        setSearchRes([]);
    }

    const debouncedSearch = useMemo(
        () =>
            debounce((val: string) => {
                getBookNames(val);
            }, 200),
        []
    );

    return (
        <div className={styles.puzzleContainer}>
            <div className={styles.puzzle}>
                {isGuessed && <div>You Win!!</div>}
                {book && 
                    <div>
                        <img src={book.covers[level].imageUrl}/>
                        <div className="flex flex-row gap-3">
                            <BookInfo level={level} name="Year" value={book.releaseYear}/>
                            <BookInfo level={level} name="Author" value={book.author}/>
                        </div>
                    </div>
                        
                }
                <div className={styles.guessContainer}>
                    <input className={styles.guessInput} list="books" type="text" value={currentGuess} onChange={(e) => {const val = e.target.value; setCurrentGuess(val); debouncedSearch(val)}}></input>
                    <button onClick={() => checkGuess(currentGuess)} className={styles.guessButton}>Submit</button>
                </div>
                {displayBooks && 
                    <div className={styles.bookNames}>
                        {searchRes.map((title: string) => {
                            return <div  className={styles.book} onClick={() => checkGuess(title)} key={title}>{title}</div>
                        })}
                    </div>
                }
                
                <div className={styles.puzzleButtons}>
                    {guesses?.map((guess, index) => {
                        return <GuessResult key={`${book.title}_${index}`} book={book.title} guess={guess}/>
                    })}
                </div>
                <div>{6 - level} Guesses left!!</div>
            </div>
        </div>
    )
}