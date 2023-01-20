import features from "../json/features.json"
import styles from "../styles/homeCustomerFeatures.module.scss"
import Feature from "./homeFeature"
import { Text } from "./text"

export default function CustomerFeatures() {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <Text variant="section" >What we offer?</Text>
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
