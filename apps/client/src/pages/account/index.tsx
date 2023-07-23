import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import styles from '@/styles/pages/account.module.scss';

import { useUser } from '@/hooks/use-user';

const Account = () =>
{
    const [user, { loading }] = useUser();
    const { push, pathname } = useRouter();

    useEffect(() =>
    {
        (
            async() =>
            {
                if (!user && !loading)
                    await push('/login');
                else if (pathname == '/account')
                    await push('/account/overview');
            }
        )();
    }, [user]);

    return (
        <div className={styles.accountContent}>

        </div>
    );
};

export default Account;
