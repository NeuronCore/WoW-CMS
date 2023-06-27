import Link from 'next/link';
import Image from 'next/image';

import Button from '../../button';

import styles from './navbar.module.scss';

import Logo from '../../../../public/images/logo.png';

const Navbar = () =>
{
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <span>
                    <Image
                        src={Logo.src}
                        alt='WoW CMS'
                        layout='fill'
                        objectFit='cover'
                    />
                </span>

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
