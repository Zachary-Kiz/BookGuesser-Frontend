import Link from "next/link"
import styles from "./Navbar.module.css"
import MobileNavbar from "./MobileNavbar"
import ProfileButton from "../ProfileButton/ProfileButton"

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
                    <ProfileButton isLoggedIn={false}></ProfileButton>
                </div>
                <MobileNavbar/>
            </div>
            
        </div>
    )
}