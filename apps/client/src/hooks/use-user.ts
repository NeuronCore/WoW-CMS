import useSWR from 'swr';
import axios from 'axios';

export const fetcher = (url: any) => axios.get(url).then(res => res.data);

export const useUser = () =>
{
    const { data, mutate, isLoading } = useSWR('account/current', fetcher);

    const loading = isLoading;
    const user = data?.data?.information;

    return [user, { mutate, loading }];
};
