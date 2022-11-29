import React from "react"
import styles from "./FeaturedPlants.module.scss"
import Card from "../components/Card"
import { useDiscountedPlants } from "../../utils/useApiPlant"
import { Plant } from "../../interfaces/plant"

export default function FeaturedPlants() {
    const { data, error }: { data: Plant[]; error: string } = useDiscountedPlants()

    if (error) return <p>Failed to get discounted plants</p>
    if (!data) return <p>Loading...</p>

    const discountedPlantsIds = data.map((plant) => plant.id)

    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Featured special offers</h2>
                <div className={styles.bg}></div>
                <div className={styles.container}>
                    {discountedPlantsIds.map((plantID) => (
                        <Card key={plantID} id={plantID} showOldPrice={true} />
                    ))}
                </div>
            </div>
        </section>
    )
}
