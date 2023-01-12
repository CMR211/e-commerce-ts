import styles from "../styles/card.module.scss"

import Button from "./button"

import { getPlantPrices } from "../utils/prices.ts"
import { fetchPlant } from "../utils/useApiPlant"
import { useQuery } from "@tanstack/react-query"

import { Plant } from "../types/types"
import QueryMessage from "./queryMessage"

type CardProps = {
    id: string
    showOldPrice?: boolean
}

export default function Card({ id, showOldPrice }: CardProps) {
    const query = useQuery(["plant" + id], () => fetchPlant(id))

    if (query.status === "loading") return <QueryMessage icon="loading" message="Loading..." />
    if (query.status === "error") return <QueryMessage icon="error" message="Error loading data" />

    const plant: Plant = query.data.data
    const prices = getPlantPrices(plant.price, plant.old_price)
    console.log(plant)

    return (
        <div className={styles.card}>
            <Button text="View Product" />
            <div className={styles.image_container}>
                <img className={styles.image} src={plant.images[0]} alt={`${plant?.name} alt`} />
            </div>
            <p className={styles.name}>{plant?.name}</p>

            <p className={styles.price}>
                {showOldPrice ? <span className={styles.old_price}>{prices.oldPriceFormatted}</span> : null}
                <span className={styles.price_prefix}>{prices.newPricePrefix}</span>
                {prices.newPriceBody}
                <span className={styles.price_suffix}>{prices.newPriceSuffix}</span>
            </p>

            <p className={styles.family}>{plant?.family}</p>
        </div>
    )
}
