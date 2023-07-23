import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export default class HttpService
{
    private instance: AxiosInstance;

    constructor()
    {
        this.instance = axios.create();
    }

    public setHeader(key: string, value: string)
    {
        axios.defaults.headers.common[key] = value;
    }

    public get<T, R = AxiosResponse<T>>(endpoint: string, config?: AxiosRequestConfig): Promise<R>
    {
        return this.instance.get(`${ endpoint }`, config);
    }

    public post<T, B, R = AxiosResponse<T>>(endpoint: string, data?: B, config?: AxiosRequestConfig): Promise<R>
    {
        return this.instance.post(`${ endpoint }`, data, config);
    }

    public put<T, B, R = AxiosResponse<T>>(endpoint: string, data?: B, config?: AxiosRequestConfig): Promise<R>
    {
        return this.instance.put(`${ endpoint }`, data, config);
    }

    public patch<T, B = Record<string, never>, R = AxiosResponse<T>>(endpoint: string, data?: B, config?: AxiosRequestConfig): Promise<R>
    {
        return this.instance.patch(`${ endpoint }`, data, config);
    }
}
