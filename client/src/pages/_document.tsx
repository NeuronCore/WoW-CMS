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
            <Html data-theme={ process.env.THEME }>
                <Head>
                    <link rel="icon" type="image/png" href="/favicon.png"/>
                    <meta name="msapplication-TileColor" content={ process.env.PRIMARY_COLOR }/>
                    <meta name="theme-color" content={ process.env.PRIMARY_COLOR }/>
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
