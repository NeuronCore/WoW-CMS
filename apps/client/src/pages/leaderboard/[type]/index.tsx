import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Preloader = dynamic(() => import('@/components/preloader'));

const DefaultLeaderboard = () =>
{
    const { query, push } = useRouter();

    useEffect(() =>
    {
        (
            async() =>
            {
                const response = await axios.get('/database/realms');

                await push(`/leaderboard/${ query.type }/${ response.data.data.realms[0] }`);
            }
        )();
    }, []);

    return <Preloader />;
};

export default DefaultLeaderboard;
