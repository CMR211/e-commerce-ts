import React from "react"
import styles from "./Feature.module.scss"

type FeatureType = {
    title: string
    description: string
    imageUrl: string
}

export default function Feature({ title, description, imageUrl }: FeatureType) {
    return (
        <div className={styles.container}>
            <div className={styles.bg} style={{ "background-image": `url(${imageUrl}` }}></div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.desc}>{description}</p>
            </div>
        </div>
    )
}
