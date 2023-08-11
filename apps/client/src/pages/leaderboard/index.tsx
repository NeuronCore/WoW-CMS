import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Preloader = dynamic(() => import('@/components/preloader'));

import leaderboard from '@/data/leaderboard.data.json';

const DefaultLeaderboard = () =>
{
    const { push } = useRouter();

    useEffect(() =>
    {
        (
            async() =>
            {
                const response = await axios.get('/database/realms');

                await push(`/leaderboard/${ leaderboard.aside[0].items[0].path }/${ response.data.data.realms[0] }`);
            }
        )();
    }, []);

    return <Preloader />;
};

export default DefaultLeaderboard;
