import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import styles from '@/components/layouts/main/main.module.scss';

import { routesData } from '@/data/routes.data';

const Navbar = dynamic(() => import('@/components/layouts/navbar/navbar.component'));
const Footer = dynamic(() => import('@/components/layouts/footer/footer.component'));

interface Props
{
    children: ReactNode
}

const Main = ({ children }: Props) =>
{
    const router = useRouter();

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
