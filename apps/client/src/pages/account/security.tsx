import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { BsCheckCircle, BsCoin, BsDiscord, BsPen } from 'react-icons/bs';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

import Profile from '@/../public/images/heros/profile.jpg';

const Input = dynamic(() => import('@/components/input'));
const Button = dynamic(() => import('@/components/button'));

const Security = () =>
{
    const [user] = useUser();

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
                    ACCOUNT Security
                </h3>

                <div className={styles.accountContentList}>
                    <div className={styles.accountContentItem}>
                        <header>
                            <h3>
                                RECENT CONNECTIONS
                            </h3>
                        </header>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">IP Address</th>
                                        <th scope="col" className="table-country">Country</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">185.206.224.42</td>
                                        <td className="table-country">DK</td>
                                        <td>Jul 23, 2023 11:47 AM</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">193.42.96.36</td>
                                        <td className="table-country">DE</td>
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

export default Security;
