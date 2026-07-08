"use client"

import { SetStateAction, useState } from 'react'
import styles from './BurgerIcon.module.css'
import clsx from 'clsx'

interface BurgerInterface {
    onClick: () => void;
    isBurger: boolean;
}

const BurgerIcon = ({onClick, isBurger} : BurgerInterface) => {


    return(
        <div className={clsx(
            'container', {
                "change" : isBurger,   
            }
        )} onClick={() => {onClick()}}>
            <div className={clsx(styles.bar1, { [styles.changeBar1]: !isBurger})} />
            <div className={clsx(styles.bar2, { [styles.changeBar2]: !isBurger})} />
            <div className={clsx(styles.bar3, { [styles.changeBar3]: !isBurger})} />
        </div>
    )
}

export default BurgerIcon;