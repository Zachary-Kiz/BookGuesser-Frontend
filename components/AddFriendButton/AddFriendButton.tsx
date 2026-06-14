"use client"

import { requestFriend } from "@/app/api/friends"
import { useState } from "react";

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

    const handleAddFriend = async (user : string) => {
        try {
            setButtonText(ButtonText.Load)
            await requestFriend(user)
            setButtonText(ButtonText.Sent)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <button onClick={() => handleAddFriend(user)}>{buttonText}</button>
    )
}