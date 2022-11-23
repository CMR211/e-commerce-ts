import React, { HTMLAttributes } from "react"
import styles from "./Button.module.scss"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    text: string
}

export default function Button(props: ButtonProps) {
    const { text } = props
    return (
        <button className={styles.button} {...props}>
            {text}
        </button>
    )
}
