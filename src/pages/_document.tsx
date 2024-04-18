import React from 'react';
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';

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
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;