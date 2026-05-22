import Link from "next/link";
import styles from "./PuzzleLink.module.css"

type PuzzleLinkType = {
    day : number;
}

export default function PuzzleLink({day} : PuzzleLinkType) {
    return (
        <Link href={`/puzzle/${day}`} className={styles.puzzleLink}>
            <div>
                #{day}
            </div>
        </Link>
    )
}