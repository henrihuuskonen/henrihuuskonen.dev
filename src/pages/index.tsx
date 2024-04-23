import React from "react";
import Head from "next/head";
import styles from "../styles/styles.module.css";
import Hero from "@/components/Avatar";
import InlineMenu from "@/components/InlineMenu";
import Projects from "@/components/Projects";
import Background from "@/components/Background";
import TextSection from "@/components/TextSection";
import Footer from "@/components/Footer";

const Home = () => {
    return (
        <div>
            <Head>
                <title>Henri Huuskonen</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <div className={styles.initial__container}>
                <Background/>
                <Hero/>
                <InlineMenu/>
            </div>
            <TextSection title="Software engineer, tinkerer" text={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                        of
                        classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
                        Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
                        Latin
                        words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
                        classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                        1.10.32
                        and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                        written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
                        Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a
                        line in
                        section 1.10.32.`}
            />
            <Projects/>
            <TextSection title="Software engineer, tinkerer" text={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                        of
                        classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
                        Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
                        Latin
                        words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
                        classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                        1.10.32
                        and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                        written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
                        Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a
                        line in
                        section 1.10.32.`}
                         titleOnRight
            />
            <Footer/>
        </div>
    )
}

export default Home
