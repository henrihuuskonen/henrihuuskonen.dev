import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

const lightTheme = createTheme({
    type: 'light',
    theme: {}
})

const darkTheme = createTheme({
    type: 'dark',
    theme: {}
})

const App = ({Component, pageProps}: AppProps) => {


    return <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
            light: lightTheme.className,
            dark: darkTheme.className
        }}
    ><NextUIProvider>
        <Component {...pageProps} />
        <
            Analytics
        />
    </NextUIProvider></NextThemesProvider>
}

export default App
