"use client"
import { useState } from "react";
import BurgerIcon from "../BurgerIcon/BurgerIcon";
import Link from "next/link";
import clsx from "clsx";

import styles from "./Navbar.module.css"
import { useAuth } from "@/contexts/AuthProvider";

export default function MobileNavbar() {

    const { isLoggedIn } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isBurger, setIsBurger] = useState<boolean>(true);

    const openMenu = () => {
        setIsOpen(prev => !prev);
        setIsBurger(prev => !prev);
    }

    return (
        <>
            <div className="flex z-11 bg-background w-16 items-center md:hidden">
                <BurgerIcon isBurger={isBurger} onClick={() => openMenu()}/>
            </div>
            <div className={clsx(styles.mobileNav, {[styles.visibleNav] : isOpen})}>
                <Link className={styles.mobileNavLink} onClick={() => openMenu()} href="/today">
                    Today
                </Link>
                <Link onClick={() => openMenu()} className={styles.mobileNavLink} href="/archive">
                    Archive
                </Link>
                {isLoggedIn ? 
                    <>
                        <Link onClick={() => openMenu()} className={styles.mobileNavLink} href="/profile">
                            Profile
                        </Link>
                        <Link onClick={() => openMenu()} className={styles.mobileNavLink} href={"/logout"}>Log Out</Link>
                    </>
                    :
                    <>
                        <Link onClick={() => openMenu()} className={styles.mobileNavLink} href={"/login"}>Login</Link>
                        <Link onClick={() => openMenu()} className={styles.mobileNavLink} href={"/sign_up"}>Sign Up</Link>
                    </>
                }
            </div>

        </>
    )
}