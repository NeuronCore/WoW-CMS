import React from 'react';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

const Overview = () =>
{
    const [user] = useUser();

    return (
        <div className={styles.accountContent}>

        </div>
    );
};

export default Overview;
