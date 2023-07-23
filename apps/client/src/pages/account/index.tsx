import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { aside } from '@/data/account.data.json';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

const Account = () =>
{
    const [user] = useUser();
    const { push, pathname } = useRouter();

    console.log(user);

    useEffect(() =>
    {
        (
            async() =>
            {
                if (!user)
                    await push('/login');
                // else if (pathname == '/account')
                //     await push('/account/overview');
            }
        )();
    }, [user]);

    return (
        <main className={styles.account}>
            <section className={styles.accountContainer}>
                <aside className={styles.accountAside}>
                    <h1 className={styles.accountAsideHeader}>Settings</h1>

                    <ul className={styles.accountAsideList}>
                        {
                            aside.map((item) =>
                                (
                                    <>
                                        <li className={styles.accountAsideListItemTitle}>
                                            { item.title }
                                        </li>
                                        {
                                            item.items.map((link) =>
                                                (
                                                    <li className={classnames(styles.accountAsideListItem, { [styles.accountAsideListItemActive]: pathname.includes(link.path) })}>
                                                        <Link href={link.path}>
                                                            { link.title }
                                                        </Link>
                                                    </li>
                                                ))
                                        }
                                    </>
                                ))
                        }
                        <li className={classnames(styles.accountAsideListItem, styles.accountAsideListItemLogout)}>
                            Log Out
                        </li>
                    </ul>
                </aside>

                <div className={styles.accountContent}>

                </div>
            </section>
        </main>
    );
};

export default Account;
