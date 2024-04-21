import React from "react";
import Head from "next/head";
import styles from "../styles/styles.module.css";
import Hero from "@/components/Avatar";

const Home = () => {
    return (
        <div>
            <Head>
                <title>Henri Huuskonen</title>
            </Head>
            <div className={styles.main__container}>
                <Hero/>
            </div>
            <div style={{height: "100px"}}>
            </div>
        </div>
    )
}

export default Home
