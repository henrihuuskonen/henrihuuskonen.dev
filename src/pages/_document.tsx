import React from 'react'
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return {
            ...initialProps,
            styles: React.Children.toArray([initialProps.styles])
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head title="Henri Huuskonen - Software Engineer">
                    <meta
                        name="description"
                        content="Experienced Senior Software Engineer from Helsinki, Finland adept at optimizing business operations with React, NodeJS, Python."
                    />
                    <link rel="shortcut icon" href="favicon.ico"/>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                        rel="stylesheet"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="robots" content="all"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument