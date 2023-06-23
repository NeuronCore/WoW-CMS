import useSWR from 'swr';
import axios from 'axios';

import { api } from '../data/api.data';

export const fetcher = (url: any) => axios.get(url).then(res => res.data);

export const useUser = () =>
{
    const { data, mutate, isLoading } = useSWR(api.createRoute('account/me'), fetcher);

    const loading = isLoading || !data;
    const user = data?.data;

    return [user, { mutate, loading }];
}
