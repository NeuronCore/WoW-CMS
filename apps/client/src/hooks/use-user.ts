import useSWR from 'swr';
import axios from 'axios';

import { apiData } from '@/data/api.data';

export const fetcher = (url: any) => axios.get(url).then(res => res.data);

export const useUser = () =>
{
    const { data, mutate, isLoading } = useSWR(apiData.createRoute('account/current'), fetcher);

    const loading = isLoading || !data;
    const user = data?.data;

    return [user, { mutate, loading }];
};
