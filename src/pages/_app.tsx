import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {Analytics} from '@vercel/analytics/react';

const App = ({Component, pageProps}: AppProps) => {
    return <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
    >
        <Component {...pageProps} />
        <
            Analytics
        />
    </NextThemesProvider>
}

export default App
