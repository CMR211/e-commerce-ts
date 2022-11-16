import React from "react"
import Button from "./Button"
import Card from "./Card"
import styles from "./Category.module.scss"

type PropsType = {
    name: string
}

export default function Category({ name }: PropsType) {
    const image = `/assets/family_${name.toLowerCase()}.webp`
    return (
        <div className={styles.container}>
            <div className={styles.image_container} style={{ backgroundImage: `url(${image})` }}></div>
            <div className={styles.title}>
                <p>{name.toUpperCase()}</p>
            </div>
            <Button text="View category" />
        </div>
    )
}
