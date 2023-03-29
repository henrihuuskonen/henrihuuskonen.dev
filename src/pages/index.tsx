import React from "react";
import {Spacer} from "@nextui-org/react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Home = () => {
    return (
        <Layout>
            <Header/>
            <Hero/>
            <Spacer y={10}/>
            <Contact/>
            <Spacer y={10}/>
            <Footer/>
        </Layout>
    )
}

export default Home
