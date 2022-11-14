import React from "react"
import Image from "next/image"
import styles from "../styles/components/Card.module.scss"

import plants from "../server/json/plants.json"

type CardProps = {
    id: string
    showOldPrice?: boolean
}

type PlantType = {
    id: string
    name: string
    category: string
    price: number
    old_price: number
    desc: string
    images: string[]
}

export default function Card({ id, showOldPrice }: CardProps) {
    const plant: PlantType = plants.find((plant) => plant.id === id)
    const price = plant.price.toLocaleString("en-US", { style: "currency", currency: "USD" })
    const oldPrice = plant.old_price.toLocaleString("en-US", { style: "currency", currency: "USD" })
    return (
        <div className={styles.card}>
            <img className={styles.img} width={280} height={280} src={plant?.images[0]} alt={`${plant?.name} alt`} />
            <p className={styles.name}>{plant?.name}</p>
            <p className={styles.price}>
                {showOldPrice ? <span className={styles.old_price}>{oldPrice}</span>:null}
                <span className={styles.price_prefix}>{price.slice(0,1)}</span>
                {price.slice(1,-3)}
                <span className={styles.price_suffix}>{price.slice(-3)}</span>
            </p>
            <p className={styles.category}>{plant?.category}</p>
        </div>
    )
}
