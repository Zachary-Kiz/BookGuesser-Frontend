import { redirect } from "next/navigation";
import Image from 'next/image';
import styles from "./Profile.module.css"
import ChartWrapper from "@/components/ChartWrapper/ChartWrapper";
import { getUser } from "../api/userServer";
import { isRefreshToken } from "@/helpers/helper";
import FriendComponent from "@/components/FriendComponent/FriendComponent";

export default async function Profile() {

    const refresh = await isRefreshToken()
    if (!refresh) redirect("/login")

    const userData = await getUser()

    
    return (
        <div className={styles.profileContainer}>
            <div className="flex flex-row justify-center items-center gap-4 p-4">
                <Image className={styles.profilePic} src="/profile.png" alt="profile picture" width={100} height={100}></Image>
                <h2 className="text-3xl">{userData['user']}</h2>
            </div>
            <div className={styles.profileChart}>
                <div className="text-center"><b>Total Guesses Distribution</b></div>
                <div>This chart shows the distribution of successful guesses across all daily puzzles. Each bar represents the number of times a puzzle was solved in a specific number of guesses.</div>
                 <ChartWrapper stats={userData['stats']}></ChartWrapper>
                 
            </div>
            <div className={styles.friendCenter}>
                <h2 className="text-center mt-8"><b>Friends</b></h2>
                 <div className="text-center">Add friends to immediately see their scores after guessing a book.</div>
                 <FriendComponent username={userData['user']}></FriendComponent>
            </div>
        </div>
    )
}