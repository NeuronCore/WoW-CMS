import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { v4 as uuidV4 } from 'uuid';
import { useRouter } from 'next/router';
import { BsPerson, BsList } from 'react-icons/bs';

import Logo from '@/components/logo';

const Button = dynamic(() => import('@/components/button'));

import styles from '@/components/layouts/navbar/navbar.module.scss';

import navbarItems from '@/data/navbar.data.json';

import { useUser } from '@/hooks/use-user';

const Navbar = () =>
{
    const [user] = useUser();
    const { pathname } = useRouter();

    return (
        <nav className={styles.navbar} data-secondery={ pathname.includes('blogs/') }>
            <div className={styles.navbarContainer}>
                <span>
                    <Image
                        src={ Logo() }
                        alt='WoW CMS'
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes={'100'}
                    />
                </span>

                <ul>
                    {
                        navbarItems.map((item) => (
                            <li key={ uuidV4() } data-active={ item.href === pathname }>
                                <Link href= { item.href }>
                                    { item.name }
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                {
                    user
                        ?
                        <Button href='/account'>
                            Account
                        </Button>
                        :
                        <Button href='/login'>
                            Login/Register
                        </Button>
                }
            </div>

            <div className={styles.navbarContainerMobile}>
                <button>
                    <BsList />
                </button>

                <span>
                    <Image
                        src={ Logo() }
                        alt='WoW CMS'
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes={'100'}
                    />
                </span>

                <Link href={user ? '/account' : '/login'}>
                    <BsPerson />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
