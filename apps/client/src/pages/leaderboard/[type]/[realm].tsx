import axios from 'axios';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from '@/styles/pages/leaderbaord.module.scss';

import { createUniqueKey } from '@/utils/helper.util';

import leaderboard from '@/data/leaderboard.data.json';

const Leaderboard = () =>
{
    const { query, push } = useRouter();

    const [realm, setRealm] = useState<string>('');
    const [realms, setRealms] = useState<[]>([]);

    useEffect(() =>
    {
        (
            async() =>
            {
                const response = await axios.get('/database/realms');

                setRealms(response.data.data.realms);

                if (query?.realm)
                {
                    for (const realmX of response.data.data.realms)
                    {
                        if (realmX === query.realm)
                            setRealm(realmX);
                    }
                }
                else
                    setRealm(response.data.data.realms[0]);
            }
        )();
    }, []);

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
            <div className={styles.leaderboardContent}>
                <h1 className={styles.leaderboardContentHeader}>
                    { query.type }
                </h1>
                <ul className={styles.leaderboardContentRealms}>
                    {
                        realms.map((realmData, index) =>
                            (
                                <li
                                    onClick={async() =>
                                    {
                                        await push(`/leaderboard/${ query.type }/${ realmData }`);
                                    }}
                                    className={classnames(styles.leaderboardContentRealmsItem, { [styles.leaderboardContentRealmsItemActive]: realmData === realm })}
                                    key={ createUniqueKey([realmData, index, 'realm_2']) }
                                >
                                    { realmData }
                                </li>
                            ))
                    }
                </ul>
                <div className={styles.leaderboardContentTableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                {
                                    leaderboard.table.thead.map((item) =>
                                        (
                                            <td>
                                                { item }
                                            </td>
                                        ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span>
                                        1
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        2
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        3
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        4
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        5
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        6
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        7
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        8
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        9
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        10
                                    </span>
                                </td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default Leaderboard;
