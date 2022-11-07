import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Card from "../components/Card"
import HomeButton from "../components/Home/HomeButton"
import Navbar from "../components/Navbar/Navbar"
import styles from "../styles/pages/Home.module.scss"

export default function Home() {
    return (
        <>
            <Navbar />
            <Head>
                <title>Plants - Home</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>
                            <span>The</span><br />Plants<br />Store
                        </h1>
                        <p className={styles.subtitle}>We love plants like you do</p>
                        <p className={styles.desc}>
                            Explore our growing collection of plants, wholeheartedly selected and maintained with care by us -
                            plant lovers. 
                        </p>
                        <p className={styles.desc}>Every plant, even exotic ones, available at your home in just 2 days.</p>
                        <HomeButton text="Go shopping" />
                    </div>
                </section>
                <section>
                    <h2>Hot now</h2>
                    {/* <Card /> */}
                </section>
            </main>
        </>
    )
}
