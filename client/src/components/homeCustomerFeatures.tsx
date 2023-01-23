import styles from "../styles/homeCustomerFeatures.module.scss"
import features from "../json/features.json"

import { HomeFeature } from "./HomeFeature"
import { Text } from "./Text"

export function HomeCustomerFeatures() {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <Text variant="section">What we offer?</Text>
                <div className={styles.features}>
                    {features.map((feature) => (
                        <HomeFeature
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
