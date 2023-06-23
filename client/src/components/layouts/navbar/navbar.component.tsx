import Link from 'next/link';

import Button from '../../button';

import styles from './navbar.module.scss';

import Logo from '../../../../public/logo.png';

const Navbar = () =>
{
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <span style={{ backgroundImage: `url(${Logo.src})` }} />
                <ul>
                    <li data-active>
                        <Link href='/'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            News
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            News
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            News
                        </Link>
                    </li>
                </ul>
                <Button>
                    Login
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
