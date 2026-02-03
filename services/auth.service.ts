import { apiHelper } from './api-helper';

export const authService = {
    async login(data: any) {
        return apiHelper({
            url: '/auth/login',
            method: 'POST',
            data
        });
    },

    async getProfile() {
        return apiHelper({
            url: '/auth/profile',
            method: 'GET'
        });
    },

    logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
    }
};
