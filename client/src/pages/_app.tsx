import React from 'react';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';

import '../utils/axios.util';

import '../styles/globals.scss';

const Main = dynamic(() => import('../components/layouts/main/main.component'));

const MyApp = ({ Component, pageProps }: AppProps) =>
{
    return (
        <Main>
            <Component { ...pageProps }/>
        </Main>
    );
};

export default MyApp;
