"use client"

import { requestFriend } from "@/app/api/friends"
import { useState } from "react";

import styles from "./AddFriendButton.module.css"

interface AddFriendInterface {
    user : string;
}

enum ButtonText {
    Add="Add Friend",
    Load="Loading...",
    Sent="Sent!"
}

export default function AddFriendButton({user} : AddFriendInterface) {

    const [buttonText,setButtonText] = useState<ButtonText>(ButtonText.Add);
    const isSent : boolean = buttonText === ButtonText.Sent;

    const handleAddFriend = async (user : string) => {
        if (buttonText === ButtonText.Sent) return
        try {
            setButtonText(ButtonText.Load)
            await requestFriend(user)
            setButtonText(ButtonText.Sent)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <button className={isSent ? styles.sentButton : styles.friendButton} onClick={() => handleAddFriend(user)}>{buttonText}</button>
    )
}