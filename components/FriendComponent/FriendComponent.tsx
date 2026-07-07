"use client"

import { acceptFriendReq, deleteFriendReq, getFriendReqs, getFriends, getUserList, requestFriend } from "@/app/api/friends"
import { useEffect, useState } from "react"
import AddFriendButton from "../AddFriendButton/AddFriendButton"

import styles from "./FriendComponent.module.css"

interface FriendComponentType {
    username : string;
}

enum FriendDisplayType {
    Search,
    Accept,
    View
}

export default function FriendComponent({username} : FriendComponentType) {
    const [users, setUsers] = useState<Array<string>>([])
    const [yourReqs, setYourReqs] = useState<Array<string>>([])
    const [friendList, setFriendList] = useState<Array<string>>([])
    const [friendDisplay, setFriendDisplay] = useState<FriendDisplayType>(FriendDisplayType.Search)

    const queryUsers = async (user : string) => {
        const userList = await getUserList(user)
        if (userList) setUsers(userList)
    }

    const queryReqs = async () => {
        try {
            const { friendReqs } = await getFriendReqs()
            const { friends } = await getFriends()
            setYourReqs(friendReqs)
            setFriendList(friends)
        } catch (e) {
            console.error(e)
        }
        
    }

    const deleteReq = async (fromUser : string) => {
        try {
            const res = await deleteFriendReq(fromUser, username);
            setYourReqs(prev => prev.filter(item => item !== fromUser))
        } catch (e) {
            console.error(e)
        }
    }

    const acceptReq = async (fromUser : string) => {
        try {
            const res = await acceptFriendReq(fromUser, username);
            setYourReqs(prev => prev.filter(item => item !== fromUser))
            setFriendList(prev => [...prev, fromUser])
        } catch (e) {
            console.error(e)
        }
    }

    const handleSwitch = (type : FriendDisplayType) => {
        setFriendDisplay(type)
    }

    useEffect(() => {
        queryReqs()
    }, [])

    return (
        <div>
            <div className="flex flex-row gap-4 items-center justify-center p-6">
                <button className={friendDisplay === FriendDisplayType.Search ? styles.selectButton : styles.requestButton} onClick={() => handleSwitch(FriendDisplayType.Search)}>Add Friends</button>
                <button className={friendDisplay === FriendDisplayType.Accept ? styles.selectButton : styles.requestButton} onClick={() => handleSwitch(FriendDisplayType.Accept)}>View Friend Requests</button>
                <button className={friendDisplay === FriendDisplayType.View ? styles.selectButton : styles.requestButton} onClick={() => handleSwitch(FriendDisplayType.View)}>View Friends</button>
            </div>
            {friendDisplay === FriendDisplayType.Search ? 
                <div className={styles.queryHeader}>
                    <div >
                        <input placeholder="Enter friend username" className={styles.queryUsers} type="text" onChange={(e) => queryUsers(e.target.value)}></input>
                    </div>
                    <div className={styles.userResults}>
                    {users.map(user => {
                        return <div className={styles.user} key={user}>{user} <AddFriendButton user={user}></AddFriendButton></div>
                    })}
                    </div>
                </div> 
                : friendDisplay === FriendDisplayType.Accept ?
                    <div className={styles.queryHeader}>
                        <div className={styles.reqHeader}>
                            Friend Requests
                        </div>
                        {yourReqs.length > 0 ?
                        
                        <div className={styles.yourReqs}>{yourReqs.map(req => {
                            return <div className={styles.user}  key={req}>
                                        {req} 
                                        <div className="flex gap-2">
                                            <button className={styles.requestButton} onClick={() => deleteReq(req)}>Decline</button> 
                                            <button className={styles.requestButton} onClick={() => acceptReq(req)}>Accept</button>
                                        </div>
                                    </div>
                        })}</div>
                        : 
                            <div className={styles.notFound}>
                                No Requests Found!
                            </div>
                        }
                    </div>
                    :
                    <div className={styles.queryHeader}>
                        <div className={styles.reqHeader}>
                            Friend List
                        </div>
                        {friendList.length > 0 && 
                        
                        <div className={styles.yourReqs}>{friendList.map(req => {
                            return <div className={styles.user}  key={req}>
                                        {req} 
                                        
                                    </div>
                        })}</div>}
                        {friendList.length == 0 && 
                            <div className={styles.notFound}>
                                No Requests Found!
                            </div>
                        }
                    </div>
        }      
        </div>
    )
}