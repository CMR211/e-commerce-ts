import React from "react"
import Card from "./Card"
import styles from "./Category.module.scss"

type PropsType = {
    name: string
    plant_ids?: [string, string]
}

export default function Category({ name, plant_ids }: PropsType) {
    const image = `/assets/family_${name.toLowerCase()}.webp`
    return (
        <div className={styles.container}>
            <div className={styles.image_container} style={{ backgroundImage: `url(${image})` }}></div>
            <div className={styles.title}><p>{name.toUpperCase()}</p></div>
            <button className={styles.button}>Browse category</button>
        </div>
    )
}
