import React from "react";
import {createTheme, NextUIProvider, Spacer} from "@nextui-org/react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Head from "next/head";
import {ThemeProvider as NextThemesProvider} from 'next-themes';

const lightTheme = createTheme({
    type: 'light',
    theme: {}
})

const darkTheme = createTheme({
    type: 'dark',
    theme: {}
})
const Home = () => {
    return (
        <>
            <NextThemesProvider
                defaultTheme="system"
                attribute="class"
                value={{
                    light: lightTheme.className,
                    dark: darkTheme.className
                }}
            ><NextUIProvider>
                <Layout>
                    <Head>
                        <title>Henri Huuskonen</title>
                    </Head>
                    <Header/>
                    <Hero/>
                    <Spacer y={10}/>
                    <Contact/>
                    <Spacer y={10}/>
                    <Footer/>
                </Layout>
            </NextUIProvider>
            </NextThemesProvider>
        </>


    )
}

export default Home
