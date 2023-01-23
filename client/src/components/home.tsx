import styles from "../styles/home.module.scss"

import {HomeButton} from "./HomeButton"
import {HomeCategories} from "./HomeCategories"
import {HomeFeaturedPlants} from "./HomeFeaturedPlants"
import {HomeCustomerFeatures} from "./HomeCustomerFeatures"

export  function Home() {
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        <span>The</span>
                        <br />
                        Plants
                        <br />
                        Store
                    </h1>
                    <p className={styles.subtitle}>We love plants like you do</p>
                    <p className={styles.desc}>
                        Explore our growing collection of plants, wholeheartedly selected and maintained with care by us - plant
                        lovers.
                    </p>
                    <p className={styles.desc}>Every plant, even exotic ones, available at your home in just 2 days.</p>
                    <HomeButton text="Go shopping" />
                </div>
            </section>
            <HomeFeaturedPlants />
            <HomeCategories />
            <HomeCustomerFeatures />
        </main>
    )
}
