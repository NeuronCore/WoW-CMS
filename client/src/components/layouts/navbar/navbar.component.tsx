import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '../../button';

import styles from './navbar.module.scss';

import navbarItems from '../../../data/navbar.data.json';

import Logo from '../../../../public/images/logo.png';

const Navbar = () =>
{
    const router = useRouter();

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
                    {
                        navbarItems.map((item) =>
                            (
                                <li data-active={ item.href === router.pathname }>
                                    <Link href= { item.href }>
                                        { item.name }
                                    </Link>
                                </li>
                            ))
                    }
                </ul>
                <Button>
                    <Link href='/login'>
                        Login
                    </Link>
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
