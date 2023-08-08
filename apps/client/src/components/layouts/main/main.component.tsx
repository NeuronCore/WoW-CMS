import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';

import {BsThreeDots, BsX} from 'react-icons/bs';

import stylesAccount from '@/styles/pages/account.module.scss';
import styles from '@/components/layouts/main/main.module.scss';

import { routesData } from '@/data/routes.data';

import { useUser } from '@/hooks/use-user';
import { useAppDispatch } from '@/redux/app/hooks';

import { setTheme } from '@/redux/features/environment/environment-slice';

import { createUniqueKey } from '@/utils/helper.util';

const Preloader = dynamic(() => import('@/components/preloader'));
const Navbar = dynamic(() => import('@/components/layouts/navbar/navbar.component'));
const Footer = dynamic(() => import('@/components/layouts/footer/footer.component'));

import asideData from '@/data/account.data.json';

interface Props
{
    children: ReactNode
}

const Main = ({ children }: Props) =>
{
    const [user, { loading }] = useUser();
    const { push, pathname, reload } = useRouter();
    const dispatch = useAppDispatch();

    const [aside, setAside] = useState<boolean>(false);

    useEffect(() =>
    {
        dispatch(setTheme(process.env.NEXT_PUBLIC_THEME));
    }, []);

    useEffect(() =>
    {
        (
            async() =>
            {
                if (!user && !loading && pathname.split('/')[1] === 'account')
                    await push('/login');
            }
        )();
    }, [user, pathname, loading]);

    const logoutHandle = async() =>
    {
        await axios.get('/auth/logout');
        reload();
    };

    return (
        <>
            <Navbar />

            <main className={styles.main}>
                {
                    pathname.split('/')[1] === 'account'
                        ?
                        loading
                            ? <Preloader />
                            :
                            <>
                                <span className={stylesAccount.accountVideo}>
                                    <video autoPlay loop>
                                        <source src={ `/videos/video_1-${ process.env.NEXT_PUBLIC_THEME }.mp4` } />
                                    </video>
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter} />
                                    <span className={stylesAccount.accountFilter2} />
                                </span>

                                <section className={stylesAccount.accountContainer}>
                                    <aside className={classnames(stylesAccount.accountAside, { [stylesAccount.accountAsideActive]: aside })}>
                                        <h1 className={stylesAccount.accountAsideHeader}>Settings</h1>

                                        <ul className={stylesAccount.accountAsideList}>
                                            {
                                                asideData.data.map((item, index) =>
                                                    (
                                                        <Fragment key={createUniqueKey([item.title, index])}>
                                                            <li className={stylesAccount.accountAsideListItemTitle}>
                                                                { item.title }
                                                            </li>
                                                            {
                                                                item.items.map((link, index) =>
                                                                    (
                                                                        <li key={createUniqueKey([item.title, link.title, index])} className={classnames(stylesAccount.accountAsideListItem, { [stylesAccount.accountAsideListItemActive]: pathname.includes(link.path) })}>
                                                                            <Link href={link.path}>
                                                                                { link.title }
                                                                            </Link>
                                                                        </li>
                                                                    ))
                                                            }
                                                        </Fragment>
                                                    ))
                                            }
                                            <li onClick={() => logoutHandle()} className={classnames(stylesAccount.accountAsideListItem, stylesAccount.accountAsideListItemLogout)}>
                                                Log Out
                                            </li>
                                        </ul>
                                    </aside>
                                    {
                                        user
                                            ?
                                            <>
                                                { children }
                                                <span onClick={() => setAside(!aside)} className={stylesAccount.accountButton}>
                                                    {
                                                        aside
                                                            ? <BsX />
                                                            : <BsThreeDots />
                                                    }
                                                </span>
                                            </>
                                            : null
                                    }
                                </section>
                            </>
                        :
                        children
                }
            </main>

            {
                routesData.noFooterRoutes.includes(pathname.split('/')[1])
                    ? null
                    : <Footer />
            }
        </>
    );
};

export default Main;
