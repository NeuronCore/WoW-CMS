import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { BsDiscord, BsPen } from 'react-icons/bs';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

import Logo from '@/components/logo';

const Button = dynamic(() => import('@/components/button'));

const Overview = () =>
{
    const [user] = useUser();

    return (
        <div className={styles.accountContent}>
            <div className={styles.accountContentList}>
                <div className={styles.accountContentItem}>
                    <header>
                        <h3>
                            Your Information
                        </h3>

                        <Link href='/account/details'>
                            <BsPen /> Edit
                        </Link>
                    </header>
                    <div>
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
                            <li>
                                <p>
                                    First Name:
                                </p>
                                <span>
                                    { user.first_name }
                                </span>
                            </li>
                            <li>
                                <p>
                                    Last Name:
                                </p>
                                <span>
                                    { user.last_name }
                                </span>
                            </li>
                            <li>
                                <p>
                                    Username:
                                </p>
                                <span>
                                    { user.username }
                                </span>
                            </li>
                            <li>
                                <p>
                                    Email:
                                </p>
                                <span>
                                    { user.email }
                                </span>
                            </li>
                            <li>
                                <p>
                                    Discord:
                                </p>
                                {
                                    user.discord
                                        ?
                                        <span>
                                            hello_im_parsa
                                        </span>
                                        :
                                        <Button>
                                            <BsDiscord />
                                            Add Discord Account
                                        </Button>
                                }
                            </li>
                            {
                                user.phone
                                    ?
                                    <li>
                                        <p>
                                            Phone:
                                        </p>
                                        <span>
                                            { user.phone }
                                        </span>
                                    </li>
                                    : null
                            }
                        </ul>
                    </div>
                </div>
                <div className={styles.accountContentItem}>
                    <header>
                        <h3>
                            ACCOUNT SECURITY
                        </h3>

                        <Link href='/account/security'>
                            <BsPen /> Edit
                        </Link>
                    </header>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
