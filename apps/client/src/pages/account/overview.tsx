import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import {BsCheckCircle, BsDiscord, BsPen} from 'react-icons/bs';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

import Profile from '@/../public/images/heros/profile.jpg';

const Button = dynamic(() => import('@/components/button'));

const Overview = () =>
{
    const [user] = useUser();

    return (
        <div className={styles.accountContent}>
            <div className={styles.accountContentListGrid1}>
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
                        <div>
                            <span>
                                <Image
                                    src={ user.avatar ? user.avatar : Profile }
                                    alt='WoW CMS'
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    sizes={'100'}
                                />
                            </span>
                            <div data-profile>
                                <h2>
                                    { user.username }
                                </h2>
                                <Button>
                                    Update Avatar
                                </Button>
                            </div>
                        </div>
                        <ul data-info>
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
                        <div data-security>
                            <CircularProgressbarWithChildren value={66}>
                                <div data-text>
                                    <strong>
                                        66%
                                    </strong>
                                    <p>
                                        COMPLETE
                                    </p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                        <ul data-security>
                            <li>
                                <BsCheckCircle />

                                <Link href='/'>
                                    <p>
                                        Verify Email
                                    </p>

                                    <span>
                                        +10
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <BsCheckCircle />

                                <Link href='/'>
                                    <p>
                                        Enable 2FA
                                    </p>

                                    <span>
                                        +10
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <BsCheckCircle />

                                <Link href='/'>
                                    <p>
                                        Add Security Question
                                    </p>

                                    <span>
                                        +10
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <BsCheckCircle />

                                <Link href='/'>
                                    <p>
                                        Link Discord
                                    </p>

                                    <span>
                                        +10
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
