import React, { HTMLAttributes } from "react"
import styles from "../styles/button.module.scss"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    text: string
}

export  function Button(props: ButtonProps) {
    const { text } = props
    return (
        <button className={styles.button} {...props}>
            {text}
        </button>
    )
}
