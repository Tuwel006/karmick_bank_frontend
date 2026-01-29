import ApiService from '@/services/ApiService';
import { USER_API_ROUTES } from './routes';

export async function getUsersList() {
    return await ApiService.fetchData({
        url: USER_API_ROUTES.USERS,
        method: 'get',
    });
}

export async function createUser(data: any) {
    return await ApiService.fetchData({
        url: USER_API_ROUTES.CREATE_USER,
        method: 'post',
        data
    });
}

// export async function updateUser(data: any) {
//     return await ApiService.fetchData({
//         url: USER_API_ROUTES.UPDATE_USER,
//         method: 'put',
//         data
//     });
// }

// export async function deleteUser(userId: string) {
//     return await ApiService.fetchData({
//         url: USER_API_ROUTES.DELETE_USER + '/' + userId,
//         method: 'delete',
//     });
// }