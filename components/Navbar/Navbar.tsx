import Link from "next/link"
import styles from "./Navbar.module.css"

export default function Navbar () {

    return (
        <div className={styles.navContainer}>
            <div>
                BookGuesser
            </div>
            <div className="text-2xl flex flex-row items-center pr-4 gap-4">
                <Link className={styles.navLink} href={"/"}>Home</Link>
                <Link className={styles.navLink} href={"/today"}>Today</Link>
                <Link className={styles.navLink} href={"/archive"}>Archive</Link>
                <Link className={styles.navLink} href={"/profile"}>Profile</Link>
                
            </div>
            
        </div>
    )
}