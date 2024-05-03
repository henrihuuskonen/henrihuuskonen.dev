import React from "react"
import Head from "next/head"
import styles from "../styles/styles.module.css"
import Hero from "@/components/Avatar"
import InlineMenu from "@/components/InlineMenu"
import Background from "@/components/Background"
import TextSection from "@/components/TextSection"
import Footer from "@/components/Footer"
import {TEXT_SECTION_SOFTWARE_DEVELOPER, TEXT_SECTION_TINKERER} from "@/content"
import Layout from "@/components/Layout"

const Home = () => {
    return (
        <Layout>
            <Head>
                <title>Henri Huuskonen - Software Engineer</title>
            </Head>
            <header role="banner">
                <div className={styles.hero__container}>
                    <Background/>
                    <Hero/>
                    <InlineMenu/>
                </div>
                <div className={styles.title__container}>
                    <h1>Hey there, my name is Henri Huuskonen.</h1>
                </div>
            </header>
            <main role="main">
                <TextSection title="Software engineer"
                             text={TEXT_SECTION_SOFTWARE_DEVELOPER}
                />
                {/*<Projects/>*/}
                <TextSection title="Tinkerer" text={TEXT_SECTION_TINKERER}
                />
            </main>
            <Footer/>
        </Layout>
    )
}

export default Home
