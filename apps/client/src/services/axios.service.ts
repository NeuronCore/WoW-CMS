import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_IP_OR_URL;
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(response => response, async error =>
{
    if (error?.response?.status === 401 && !refresh)
    {
        refresh = true;

        const response = await axios.get('/auth/refresh');

        if (response.status === 200)
        {
            axios.defaults.headers.common['authorization'] = `Bearer ${ response.data.data }`;
            return axios(error.config);
        }
    }

    refresh = false;

    return error;
});
