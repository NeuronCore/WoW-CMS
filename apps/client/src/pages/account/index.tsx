import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useUser } from '@/hooks/use-user';

const Preloader = dynamic(() => import('@/components/preloader'));

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

    return (<Preloader />);
};

export default Account;
