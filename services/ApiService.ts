import BaseService from './BaseService';

export interface APIResponse {
    success: boolean;
    message: string;
    data?: any;
}
export interface LoginResponse {
    success: boolean;
    message: string;
    data?: any;
    access_token:string;
}

const ApiService = {
    fetchData(param: any) {
        return new Promise<APIResponse|LoginResponse>((resolve, reject) => {
            BaseService(param).then(response => {
                resolve(response?.data);
            }).catch(errors => {
                reject(errors);
            });
        });
    },
};

export default ApiService;