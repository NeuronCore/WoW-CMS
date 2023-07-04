import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

import styles from '@/components/layouts/main/main.module.scss';

import { routesData } from '@/data/routes.data';

import { useAppDispatch } from '@/redux/app/hooks';
import { setTheme } from '@/redux/features/environment/environment-slice';

const Navbar = dynamic(() => import('@/components/layouts/navbar/navbar.component'));
const Footer = dynamic(() => import('@/components/layouts/footer/footer.component'));

interface Props
{
    children: ReactNode
}

const Main = ({ children }: Props) =>
{
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() =>
    {
        dispatch(setTheme(process.env.NEXT_PUBLIC_THEME));
    }, []);

    return (
        <>
            <Navbar />

            <div className={styles.main}>
                { children }
            </div>

            {
                routesData.noFooterRoutes.includes(router.pathname)
                    ? null
                    : <Footer />
            }
        </>
    );
};

export default Main;
