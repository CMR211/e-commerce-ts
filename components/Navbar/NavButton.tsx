import React from "react"
import Image from "next/image"

import styles from "../../styles/components/NavButton.module.scss"

type NavButtonProps = {
    icon: string
    action?: () => void
    alt?: string
}

export default function NavButton({ icon, action, alt }: NavButtonProps) {
    return (
        <div className={styles.button}>
            <Image src={`/icons/${icon}.png`} alt={alt} width={32} height={32}/>
        </div>
    )
}
