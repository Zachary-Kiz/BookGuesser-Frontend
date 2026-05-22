import Link from "next/link"
import styles from "./Navbar.module.css"
import MobileNavbar from "./MobileNavbar"

export default function Navbar () {

    return (
        <div>
            <div className={styles.navContainer}>
                <div className="w-full bg-background z-11 pl-8">
                    BookGuesser
                </div>
                <div className="text-2xl flex-row items-center pr-20 hidden md:flex">
                    <Link className={styles.navLink} href={"/today"}>Today</Link>
                    <Link className={styles.navLink} href={"/archive"}>Archive</Link>
                    <Link className={styles.navLink} href={"profile"}>Profile</Link> 
                </div>
                <MobileNavbar/>
            </div>
            
        </div>
    )
}