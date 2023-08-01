import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import '../services/axios.service';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'react-circular-progressbar/dist/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import '../styles/globals.scss';

import { store } from '@/redux/app/store';

const Main = dynamic(() => import('../components/layouts/main/main.component'));

const MyApp = ({ Component, pageProps, router }: AppProps) =>
{
    return (
        <Provider store={ store }>
            <AnimatePresence mode='wait' initial={ false }>
                <Main>
                    <Component { ...pageProps } key={ router.asPath }/>
                </Main>
            </AnimatePresence>
        </Provider>
    );
};

export default MyApp;
