import PuzzleLink from "@/components/PuzzleLink/PuzzleLink";
import styles from "./Archive.module.css"

import { getNumDays } from "@/api/archive"

export default async function Archive() {

    const numPuzzles = await getNumDays();

    return (
        <div className={styles.archiveContainer}>
            <div className={styles.archiveBackground}>
                {Array(numPuzzles).fill(null).map((num, index) => {
                    return <PuzzleLink key={`puzzle_day_${index}`} day={index + 1}/>
                })}
            </div>
        </div>
    )
}