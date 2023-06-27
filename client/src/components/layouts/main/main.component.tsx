import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

import styles from './main.module.scss';

const Navbar = dynamic(() => import('../navbar/navbar.component'));
const Footer = dynamic(() => import('../footer/footer.component'));

interface Props
{
    children: ReactNode
}

const Main = ({ children }: Props) =>
{
    return (
        <>
            <Navbar />

            <div className={styles.main}>
                { children }
            </div>

            <Footer />
        </>
    );
};

export default Main;
