import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BaseService = axios.create({
    timeout: 60000,
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',
});

BaseService.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

BaseService.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    error => {
        const { response } = error;
        if (response && response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                if (window.location.pathname !== '/auth/login') {
                    window.location.href = '/auth/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export const apiHelper = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await BaseService(config);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export default BaseService;
