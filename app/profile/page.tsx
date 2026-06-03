import { getUser } from "@/api/userServer"
import { redirect } from "next/navigation";
import Image from 'next/image';
import styles from "./Profile.module.css"
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as Chartjs, Legend, LinearScale, Tooltip} from 'chart.js'
import ChartWrapper from "@/components/ChartWrapper/ChartWrapper";




export default async function Profile() {

    const user = await getUser();
    if (!user) redirect("/login")
    const username = user['user']

    
    return (
        <div className={styles.profileContainer}>
            <div className="flex flex-row justify-center items-center gap-4 p-4">
                <Image className={styles.profilePic} src="/profile.png" alt="profile picture" width={100} height={100}></Image>
                <h2 className="text-3xl">{username}</h2>
            </div>
            <div className={styles.profileChart}>
                <div className="text-center"><b>Total Guesses Distribution</b></div>
                <div>This chart shows the distribution of successful guesses across all daily puzzles. Each bar represents the number of times a puzzle was solved in a specific number of guesses.</div>
                 <ChartWrapper stats={user['stats']}></ChartWrapper>
            </div>
           
            
        </div>
    )
}