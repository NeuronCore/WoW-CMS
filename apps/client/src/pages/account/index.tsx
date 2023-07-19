import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useUser } from '@/hooks/use-user';

const Account = () =>
{
    const [user] = useUser();
    const { push } = useRouter();

    useEffect(() =>
    {
        (
            async() =>
            {
                if (!user)
                    await push('/login');
            }
        )();
    }, [user]);

    return (<></>);
};

export default Account;
