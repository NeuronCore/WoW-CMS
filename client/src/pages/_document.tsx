import React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document
{
    static async getInitialProps(ctx: DocumentContext)
    {
        return await Document.getInitialProps(ctx);
    }

    render()
    {
        return (
            <Html data-theme='dark'>
                <Head>
                    <meta name="description" content="WOW CMS"/>

                    <link rel="icon" type="image/png" href="/favicon.png"/>
                    <meta name="msapplication-TileColor" content="#00aaff"/>
                    <meta name="theme-color" content="#00aaff"/>
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
