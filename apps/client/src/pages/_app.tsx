import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../services/axios.service';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import '../styles/globals.scss';

import { store } from '@/redux/app/store';

const Main = dynamic(() => import('../components/layouts/main/main.component'));

const MyApp = ({ Component, pageProps }: AppProps) =>
{
    const [mounted, setMounted] = useState(false);

    useEffect(() =>
    {
        setMounted(true);
    }, []);

    return (
        mounted
        &&
        <Provider store={ store }>
            <Main>
                <Component { ...pageProps }/>
            </Main>
        </Provider>
    );
};

export default MyApp;
