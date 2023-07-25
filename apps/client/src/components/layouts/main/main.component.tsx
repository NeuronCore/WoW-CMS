import Link from 'next/link';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { Fragment, ReactNode, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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

import { aside as asideData } from '@/data/account.data.json';

interface Props
{
    children: ReactNode
}

const Main = ({ children }: Props) =>
{
    const [user, { loading }] = useUser();
    const { push, pathname } = useRouter();
    const dispatch = useAppDispatch();

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

    return (
        <>
            <Navbar />

            <div className={styles.main}>
                {
                    pathname.split('/')[1] === 'account'
                        ?
                        loading
                            ? <Preloader />
                            :
                            <section className={stylesAccount.accountContainer}>
                                <aside className={stylesAccount.accountAside}>
                                    <h1 className={stylesAccount.accountAsideHeader}>Settings</h1>

                                    <ul className={stylesAccount.accountAsideList}>
                                        {
                                            asideData.map((item, index) =>
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
                                        <li className={classnames(stylesAccount.accountAsideListItem, stylesAccount.accountAsideListItemLogout)}>
                                            Log Out
                                        </li>
                                    </ul>
                                </aside>
                                {
                                    user
                                        ?
                                        <TransitionGroup>
                                            <CSSTransition key={pathname} classNames='slide' timeout={1000}>
                                                { children }
                                            </CSSTransition>
                                        </TransitionGroup>

                                        : null
                                }
                            </section>
                        :
                        children
                }
            </div>

            {
                routesData.noFooterRoutes.includes(pathname.split('/')[1])
                    ? null
                    : <Footer />
            }
        </>
    );
};

export default Main;
