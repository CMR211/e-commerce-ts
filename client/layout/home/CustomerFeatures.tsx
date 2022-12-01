import React from "react"
import features from "../json/features.json"
import styles from "./CustomerFeatures.module.scss"
import Feature from "../components/Feature"

export default function CustomerFeatures() {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>What we offer?</h2>
                <div className={styles.features}>
                    {features.map((feature) => (
                        <Feature
                            key={feature.title}
                            title={feature.title}
                            description={feature.desc}
                            imageUrl={feature.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
