import axios from 'axios';

const unauthorizedCode = [401];

const BaseService = axios.create({
    timeout: 60000,
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

BaseService.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

BaseService.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { response } = error;
        if (response && unauthorizedCode.includes(response.status)) {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default BaseService;