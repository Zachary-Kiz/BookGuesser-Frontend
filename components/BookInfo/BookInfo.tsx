import { HintLevels } from "@/types/book";
import styles from "./BookInfo.module.css"

interface Info {
    level: number;
    name: string;
    value: string | number;
}

export default function BookInfo({level, name, value} : Info) {
    const isViewable = level > HintLevels[name];
    return (
        <div className={`${styles.bookInfo} ${isViewable && styles.isVis}`}>
            <div>{name}:</div>
            <div>{isViewable ? value : "???"}</div>
        </div>
    )
}