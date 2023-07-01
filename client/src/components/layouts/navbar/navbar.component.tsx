import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { v4 as uuidV4 } from 'uuid';
import { useRouter } from 'next/router';

const Button = dynamic(() => import('@/components/button'));

import styles from '@/components/layouts/navbar/navbar.module.scss';

import navbarItems from '@/data/navbar.data.json';

import Logo from '@/../public/images/logos/wow_cms.png';

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
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </span>

                <ul>
                    {
                        navbarItems.map((item) =>
                            (
                                <li key={ uuidV4() } data-active={ item.href === router.pathname }>
                                    <Link href= { item.href }>
                                        { item.name }
                                    </Link>
                                </li>
                            ))
                    }
                </ul>
                <Button href='/login'>
                    Login
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
