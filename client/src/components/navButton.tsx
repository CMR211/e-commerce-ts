import React from "react"

import styles from "../styles/navButton.module.scss"

type NavButtonProps = {
    action?: () => void
    alt?: string
    children?: any
}

export default function NavButton({ action, alt, children }: NavButtonProps) {
    return (
        <div className={styles.button}>
            {children}
        </div>
    )
}
