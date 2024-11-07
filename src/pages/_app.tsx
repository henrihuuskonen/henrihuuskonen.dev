import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider as NextThemesProvider} from 'next-themes'
import {Analytics} from '@vercel/analytics/react'
import React from "react"
import {SpeedInsights} from "@vercel/speed-insights/next"
import {META_DESCRIPTION} from "@/content"
import Head from "next/head"

const App = ({Component, pageProps}: AppProps) => {
    return <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
    >
        <Head>
            <meta property="og:title" content="Henri Huuskonen - Software Engineer"/>
            <meta
                property="og:description"
                content={META_DESCRIPTION}
            />
            <meta
                property="og:image"
                content="https://henrihuuskonen.dev/henri-huuskonen-avatar.svg"
            />
            <meta property="og:type" content="website"/>
            <meta
                property="og:url"
                content="https://henrihuuskonen.dev/"
            />
            <link
                rel="canonical"
                href="https://henrihuuskonen.dev/"
                key="canonical"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <Component {...pageProps} />
        <Analytics/>
        <SpeedInsights/>
    </NextThemesProvider>
}

export default App
