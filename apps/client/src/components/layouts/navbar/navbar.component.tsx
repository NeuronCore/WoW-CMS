import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { v4 as uuidV4 } from 'uuid';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { animated, useSpring } from 'react-spring';
import { BsPerson, BsList, BsCoin } from 'react-icons/bs';

import Logo from '@/components/logo';

const Button = dynamic(() => import('@/components/button'));

import styles from '@/components/layouts/navbar/navbar.module.scss';

import navbarItems from '@/data/navbar.data.json';

import { useUser } from '@/hooks/use-user';

const Navbar = () =>
{
    const [user] = useUser();
    const { pathname, asPath, locale, locales } = useRouter();

    const [localePopup, setLocalePopup] = useState(false);

    const springStyles = useSpring({ opacity: localePopup ? 1 : 0 });

    return (
        <nav className={styles.navbar} data-secondery={ pathname.includes('blogs/') }>
            <div className={styles.navbarContainer}>
                <Link href='/' data-logo>
                    <Image
                        src={ Logo() }
                        alt='WoW CMS'
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes={'100'}
                    />
                </Link>

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
                <div>
                    {
                        locale && locales
                            ?
                            <div onClick={() => setLocalePopup(!localePopup)}>
                                <p>
                                    EN
                                </p>
                                {
                                    localePopup
                                        ?
                                        <animated.div style={ springStyles }>
                                            {
                                                locales.map((localeData) =>
                                                    (
                                                        <Link key={localeData} href={asPath} locale={localeData} data-active={locale.toLocaleUpperCase() === localeData.toLocaleUpperCase()}>
                                                            { localeData.toUpperCase() }
                                                        </Link>
                                                    ))
                                            }
                                        </animated.div>
                                        : null
                                }
                            </div>
                            : null
                    }
                    {
                        user
                            ?
                            <>
                                <span>
                                    <BsCoin />
                                    { user.coins ?? 0 }
                                </span>
                                <Button href='/account'>
                                    Account
                                </Button>
                            </>
                            :
                            <Button href='/login'>
                                Login/Register
                            </Button>
                    }
                </div>
            </div>

            <div className={styles.navbarContainerMobile}>
                <button>
                    <BsList />
                </button>

                <span>
                    <Link href='/'>
                        <Image
                            src={ Logo() }
                            alt='WoW CMS'
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes={'100'}
                        />
                    </Link>
                </span>

                <Link href={user ? '/account' : '/login'}>
                    <BsPerson />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
