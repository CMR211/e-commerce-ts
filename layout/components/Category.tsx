import React from "react"
import Card from "./Card"
import styles from "./Category.module.scss"

type PropsType = {
    name: string
    plant_ids: string[]
}

export default function Category({ name, plant_ids }: PropsType) {
    return (
        <div className={styles.container}>
            <div className={styles.leader}>{name}</div>
            {plant_ids.map(plant_id => {
                return (
                    <Card key={plant_id} id={plant_id} />
                )
            })}
        </div>
    )
}
