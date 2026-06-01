"use client"

import { searchBooks, debounce, getTodayPuzzle} from "@/api/todayPuzzle";
import { useEffect, useMemo, useState } from "react";
import styles from "./BookPage.module.css"
import { Book, Level } from "@/types/book";
import GuessResult from "@/components/GuessResult/GuessResult";
import BookInfo from "@/components/BookInfo/BookInfo";
import ShareButton from "../ShareButton/ShareButton";
import { useAuth } from "@/contexts/AuthProvider";
import { uploadGuess } from "@/api/guess";
import { Guess } from "@/types/user";

type BookPageType = {
    book: Book;
    username : string;
    id : string;
    prevGuesses?: Array<string>
    guessed : Guess
}

export default function BookPage({book, username, id, guessed, prevGuesses=[]} : BookPageType) {

    
    const { isLoggedIn } = useAuth();

    const [guesses, setGuesses] = useState<Array<string>>(prevGuesses);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [searchRes, setSearchRes] = useState<Array<string>>([])
    const [isGuessed, setIsGuessed] = useState<Guess>(guessed);

    const bookTitle : string = book?.title;
    const displayBooks = searchRes.length !== 0;
    const level : Level = isGuessed ? 6 : (guesses.length as Level);
    const correctGuess = isGuessed === Guess.Failed ? 7 : guesses.length - 1;

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
            setIsGuessed(Guess.Success);
        }
        setGuesses([...guesses, guess]);
        setCurrentGuess("");
        setSearchRes([]);
    }

    const sendGuess = async () => {
        if (!isLoggedIn) return;
        if (isGuessed === Guess.Failed || isGuessed === Guess.Success) {
            const guessed = isGuessed == Guess.Success ? true : false;
            await uploadGuess(id, username, guessed, guesses)

        }
    }

    useEffect(() => {
        if (guesses.length === 6 && isGuessed === Guess.Guessing) setIsGuessed(Guess.Failed)
    }, [guesses])

    useEffect(() => {
        sendGuess()
    }, [isGuessed])

    const debouncedSearch = useMemo(
        () =>
            debounce((val: string) => {
                getBookNames(val);
            }, 100),
        []
    );

    return (
        <div className={styles.puzzleContainer}>
            <div className={styles.puzzle}>
                {book && 
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-(--medium-brown) w-full flex flex-col items-center">
                            <img className={styles.imageSize} src={book.covers[level].imageUrl}/>
                        </div>
                        <div className="flex flex-row gap-3 justify-center max-w-fit">
                            <BookInfo level={level} name="Genre" value={book.genre}/>
                            <BookInfo level={level} name="Year" value={book.releaseYear}/>
                            <BookInfo level={level} name="Author" value={book.author}/>
                        </div>
                    </div>
                        
                }
                {isGuessed !== Guess.Guessing ? 
                    <div className="flex flex-col w-full justify-center items-center gap-4 mt-4">
                        <div className="flex flex-row  gap-2 items-center">
                            {Array(6).fill(null).map((elem, index) => {
                                
                                return index < correctGuess ? 
                                    <div key={`${bookTitle}_${index}`} className={styles.incorrectGuess}></div> 
                                    : index > correctGuess ? 
                                    <div key={`${bookTitle}_${index}`} className={styles.notGuess}></div> 
                                    : 
                                    <div key={`${bookTitle}_${index}`} className={styles.correctGuess}></div>
                            })}
                            <ShareButton day={book.id} correctGuess={correctGuess}></ShareButton>
                        </div>
                        {isGuessed == Guess.Success && <div>You Got It!</div>}
                        {isGuessed == Guess.Failed && <div>Better Luck Next Time</div>}
                    </div>
                    :
                    <div>
                        <div className={styles.guessContainer}>
                            <input placeholder="Enter book title..." className={styles.guessInput} list="books" type="text" value={currentGuess} onChange={(e) => {const val = e.target.value; setCurrentGuess(val); debouncedSearch(val)}}></input>
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
                                return <GuessResult key={`${book.title}_${index}`} guess={guess}/>
                            })}
                        </div>
                        <div className="w-full flex justify-center mt-3">{6 - level} Guesses left!!</div>
                    </div>
                }
            </div>
        </div>
    )
}