import Link from "next/link"
import styles from "./ProfileButton.module.css"

interface ProfileInterface {
    isLoggedIn : boolean;
}

export default function ProfileButton({isLoggedIn} : ProfileInterface) {

    return (
        <>
            {isLoggedIn ? 
                <Link className={styles.navLink} href={"/profile"}>Profile</Link>
                :
                <>
                <Link className={styles.navLink} href={"/login"}>Login</Link>
                <Link className={styles.navLink} href={"sign_up"}>Sign Up</Link>
                </>  
            }
        </>
    )
}