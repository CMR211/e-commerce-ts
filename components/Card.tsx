import React from "react"
import styles from "../styles/components/Card.module.scss"

import plants from "../server/json/plants.json"

import { getPlantPrices } from "../utils/prices"

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
    const plant: PlantType = plants.find((plant) => plant.id === id) ?? plants[0]
    const prices = getPlantPrices(plant.price, plant.old_price)

    return (
        <div className={styles.card}>
            <img className={styles.img} width={280} height={280} src={plant?.images[0]} alt={`${plant?.name} alt`} />

            <p className={styles.name}>{plant?.name}</p>

            <p className={styles.price}>
                {showOldPrice ? <span className={styles.old_price}>{prices.oldPriceFormatted}</span> : null}
                <span className={styles.price_prefix}>{prices.newPricePrefix}</span>
                {prices.newPriceBody}
                <span className={styles.price_suffix}>{prices.newPriceSuffix}</span>
            </p>

            <p className={styles.category}>{plant?.category}</p>
        </div>
    )
}
