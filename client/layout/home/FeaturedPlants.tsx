import React from "react"
import styles from "./FeaturedPlants.module.scss"
import Card from "../components/Card"
import { fetchDiscountedPlants } from "../../utils/useApiPlant"
import { Plant } from "../../interfaces/plant"
import { useQuery } from "@tanstack/react-query"
import QueryMessage from "../components/QueryMessage"

export default function FeaturedPlants() {
    const query = useQuery(["discountedPlants"], fetchDiscountedPlants)
    if (query.status === "loading") return <QueryMessage icon="loading" message="Loading..." />
    if (query.status === "error") return <QueryMessage icon="error" message="Error loading data" />

    const plants: Plant[] = query.data.data
    const discountedPlantsIds = plants.map((plant) => plant._id)

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
