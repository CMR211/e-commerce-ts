import React from "react"

import styles from "../styles/navButton.module.scss"

type NavButtonProps = {
    icon: string
    action?: () => void
    alt?: string
}

export default function NavButton({ icon, action, alt }: NavButtonProps) {
    return (
        <div className={styles.button}>
            <img src={`/icons/${icon}.png`} alt={alt} width={32} height={32} />
        </div>
    )
}
