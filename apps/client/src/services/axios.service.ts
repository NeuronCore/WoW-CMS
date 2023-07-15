import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(response => response, async error =>
{
    if (error?.response?.status === 401 && !refresh)
    {
        refresh = true;

        const response = await axios.get('auth/refresh');

        if (response.status === 200)
        {
            axios.defaults.headers.common['Authorization'] = `Bearer ${ response.data.data }`;
            return axios(error.config);
        }
    }

    refresh = false;

    return error;
});
