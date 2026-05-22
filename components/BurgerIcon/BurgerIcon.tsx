"use client"

import { useState } from 'react'
import styles from './BurgerIcon.module.css'
import clsx from 'clsx'

interface BurgerInterface {
    onClick: () => void;    
}

const BurgerIcon = ({onClick} : BurgerInterface) => {

    const [isBurger, setIsBurger] = useState(true)

    const changeBurger = () => {
        setIsBurger(prev => !prev)
    }

    return(
        <div className={clsx(
            'container', {
                "change" : isBurger,   
            }
        )} onClick={() => {changeBurger(); onClick()}}>
            <div className={clsx(styles.bar1, { [styles.changeBar1]: !isBurger})} />
            <div className={clsx(styles.bar2, { [styles.changeBar2]: !isBurger})} />
            <div className={clsx(styles.bar3, { [styles.changeBar3]: !isBurger})} />
        </div>
    )
}

export default BurgerIcon;