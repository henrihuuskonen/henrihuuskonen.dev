import React from "react";
import {Container, Spacer, Text, useTheme} from "@nextui-org/react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";

const Home = () => {
    const {isDark, theme} = useTheme();

    return (
        <Layout>
            <Header/>

            <Hero />

            <Spacer y={10}/>

            <Contact />

            <Spacer y={10}/>

            <Container fluid justify="center" css={{}}>
                <Text h6 css={{
                    textAlign: "center"
                }}>Created by Henri Huuskonen</Text>
            </Container>

        </Layout>
    )
}

export default Home
