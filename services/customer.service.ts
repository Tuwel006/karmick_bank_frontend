import { apiHelper } from './api-helper';

export const customerService = {
    async getCustomers(params?: any) {
        return apiHelper({
            url: '/customer',
            method: 'GET',
            params
        });
    },

    async getCustomerById(id: string) {
        return apiHelper({
            url: `/customer/${id}`,
            method: 'GET'
        });
    },

    async updateKYCStatus(id: string, data: any) {
        return apiHelper({
            url: `/customer/${id}/kyc`,
            method: 'PATCH',
            data
        });
    },

    async getCustomerStats() {
        return apiHelper({
            url: '/customer/stats',
            method: 'GET'
        });
    }
};
