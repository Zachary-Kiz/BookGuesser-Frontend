"use client"

interface Share {
    day: string;
    correctGuess : number;
}

import { useState } from "react";
import styles from "./ShareButton.module.css"

export default function ShareButton({day, correctGuess} : Share) {

    const [buttonText, setButtonText] = useState<string>("Share")

    let shareText = `BookGuesser - Challenge #${day}\n`;
    for (let i = 0; i < 6; i++) {
        if (correctGuess == i) shareText += '⬛';
        else if (i < correctGuess) shareText += '🟫 ';
        else shareText += ' ⬜';
    }
    shareText += '\n\nhttps://book-guesser-frontend.vercel.app/today'

    const shareLink = () => {
        navigator.clipboard.writeText(shareText);
        setButtonText("Copied")
        setTimeout(function(){
            setButtonText("Share")
        }, 3000);
    }

    return (
        <button className={styles.shareButton} onClick={() => shareLink()}>{buttonText}</button>
    )
}