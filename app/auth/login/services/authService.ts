import ApiService from '@/services/ApiService';
import { AUTH_API_ROUTES } from './routes';

export async function loginUser(email: string, password: string) {
    return await ApiService.fetchData({
        url: AUTH_API_ROUTES.LOGIN,
        method: 'post',
        data: { email, password }
    });
}