import React from 'react';
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import { getInitColorSchemeScript } from '@mui/material';
import type {} from '@mui/material/themeCssVarsAugmentation';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: React.Children.toArray([initialProps.styles])
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head title="Henri Huuskonen">
                    <meta
                        name="description"
                        content="Henri Huuskonen, a full-stack software developer from Finland."
                    />
                    <link rel="shortcut icon" href="favicon.ico" />
                    {CssBaseline.flush()}
                </Head>
                <body>
                {getInitColorSchemeScript()}
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;