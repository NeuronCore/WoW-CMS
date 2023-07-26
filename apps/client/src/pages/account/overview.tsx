import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { BsCheckCircle, BsChevronRight, BsCoin, BsDiscord } from 'react-icons/bs';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

import Profile from '@/../public/images/heros/profile.jpg';

const Input = dynamic(() => import('@/components/input'));
const Button = dynamic(() => import('@/components/button'));

const Overview = () =>
{
    const [user] = useUser();

    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20
            }}
        >
            <div className={styles.accountContent}>
                <h3 className={styles.accountContentHeader}>
                    { t('account:overview.title') }
                </h3>

                <div className={styles.accountContentListGrid1}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                { t('account:overview.subtitleInfo') }
                            </h3>

                            <Link href='/account/details'>
                                { t('account:overview.edit') } <BsChevronRight />
                            </Link>
                        </header>
                        <div>
                            <div data-container>
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
                                        { t('account:overview.updateAvatar') }
                                    </Button>
                                </div>
                            </div>
                            <ul data-info>
                                <li>
                                    <p>
                                        { t('account:details.firstNameInput.label') }:
                                    </p>
                                    <span>
                                        { user.first_name }
                                    </span>
                                </li>
                                <li>
                                    <p>
                                        { t('account:details.lastNameInput.label') }:
                                    </p>
                                    <span>
                                        { user.last_name }
                                    </span>
                                </li>
                                <li>
                                    <p>
                                        { t('account:details.email') }:
                                    </p>
                                    <span>
                                        { user.email }
                                    </span>
                                </li>
                                <li>
                                    <p>
                                        { t('account:overview.discord') }:
                                    </p>
                                    {
                                        user.discord
                                            ?
                                            <span>
                                                hello_im_parsa#0000
                                            </span>
                                            :
                                            <Button>
                                                <BsDiscord />
                                                { t('account:overview.addDiscord') }
                                            </Button>
                                    }
                                </li>
                                {
                                    user.phone
                                        ?
                                        <li>
                                            <p>
                                                { t('account:overview.phoneInput.label') }:
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
                                { t('account:overview.subtitleSecurity') }:
                            </h3>

                            <Link href='/account/security'>
                                { t('account:overview.edit') } <BsChevronRight />
                            </Link>
                        </header>
                        <div>
                            <div data-container data-security>
                                <CircularProgressbarWithChildren value={66}>
                                    <div data-text>
                                        <strong>
                                            66%
                                        </strong>
                                        <p>
                                            { t('account:overview.complete') }
                                        </p>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                            <ul data-security>
                                <li>
                                    <BsCheckCircle />

                                    <Link href='/'>
                                        <p>
                                            { t('account:overview.verifyEmail') }
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
                                            { t('account:overview.enable2FA') }
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
                                            { t('account:overview.addSQ') }
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
                                            { t('account:overview.linkDiscord') }
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
                <div className={styles.accountContentListGrid1}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                { t('account:overview.balance') }
                            </h3>
                        </header>
                        <div>
                            <ul data-security>
                                <li>
                                    0 <BsCoin />

                                    <Link href='/'>
                                        <p>
                                            { t('account:overview.donate') }
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    0 <BsCoin />

                                    <Link href='/'>
                                        <p>
                                            { t('account:overview.visitShop') }
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    0 <BsCoin />

                                    <div data-link>
                                        <p>
                                            { t('account:overview.currencyInfo') }
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                { t('account:overview.redeemACode') }
                            </h3>
                        </header>
                        <div data-redeem>
                            <Input
                                required
                                name='code'
                                label='Your Code'
                                placeholder='XXXXX-ZZZZZ-YYYYY-AAAAA'
                            />
                            <Button>
                                { t('account:overview.redeemCode') }
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={styles.accountContentList}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                { t('account:overview.recentConnection') }
                            </h3>
                        </header>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            { t('account:overview.ip') }
                                        </th>
                                        <th>
                                            { t('account:overview.country') }
                                        </th>
                                        <th>
                                            { t('account:overview.date') }
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>185.206.224.42</td>
                                        <td>DK</td>
                                        <td>Jul 23, 2023 11:47 AM</td>
                                    </tr>
                                    <tr>
                                        <td>193.42.96.36</td>
                                        <td>DE</td>
                                        <td>Jul 23, 2023 11:47 AM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Overview;
