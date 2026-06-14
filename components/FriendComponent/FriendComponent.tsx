"use client"

import { getFriendReqs, getUserList, requestFriend } from "@/app/api/friends"
import { useEffect, useMemo, useState } from "react"
import AddFriendButton from "../AddFriendButton/AddFriendButton"

export default function FriendComponent() {
    const [users, setUsers] = useState<Array<string>>([])
    const [yourReqs, setYourReqs] = useState<Array<string>>([])

    const queryUsers = async (user : string) => {
        const userList = await getUserList(user)
        if (userList) setUsers(userList)
    }

    const queryReqs = async () => {
        try {
            const { friendReqs } = await getFriendReqs()
            setYourReqs(friendReqs)
        } catch (e) {
            console.error(e)
        }
        
    }

    useEffect(() => {
        queryReqs()
    }, [])

    return (
        <div>
            <div>
                <input type="text" onChange={(e) => queryUsers(e.target.value)}></input>
                {users.map(user => {
                    return <div key={user}>{user} <AddFriendButton user={user}></AddFriendButton></div>
                })}
            </div>
            <div>
                Requests
                {yourReqs.map(req => {
                    return <div key={req}>{req}</div>
                })}
            </div>
        </div>
    )
}