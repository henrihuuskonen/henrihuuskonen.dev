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
            <TextSection title="Software engineer" text={`Experienced Senior Software Engineer with a knack for optimizing business operations through efficient software solutions. Over 5 years as a Software Engineer, I've built integrations to logistics providers, developed customer portals, and streamlined internal processes. Proficient in a diverse tech stack including React, NodeJS, Typescript, and Python, I thrive on tackling complex challenges and iterating on user experiences by making data-driven decisions through A/B testing. With a background in small electronics repair and customer service, I bring hands-on experience and a practical approach to software development.`}
            />
            {/*<Projects/>*/}
            <TextSection title="Tinkerer" text={`I've always had a fascination with how things, including websites and electronics, operate. My hobby of fixing mobile devices in my free time while attending school helped me land a job as a mobile technician. After that, I found myself working for a start-up in a more factory-like environment with countless automation opportunities. I eventually came up with a number of software tools for automation that minimise human error and boost throughput. That helped me land a position on the engineering team of the company, and the rest is history.
I still enjoy creating things with my hands now, outside of work, and I've been working on small IoT projects and fixing an old sailboat.`}
                         titleOnRight
            />
            <Footer/>
        </div>
    )
}

export default Home
