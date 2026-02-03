import { apiHelper } from './api-helper';

export const accountService = {
    async getAccounts(params?: any) {
        return apiHelper({
            url: '/accounts',
            method: 'GET',
            params
        });
    },

    async getAccountById(id: string) {
        return apiHelper({
            url: `/accounts/${id}`,
            method: 'GET'
        });
    },

    async getAccountsWithCustomers(params?: any) {
        return apiHelper({
            url: '/accounts/with-customers',
            method: 'GET',
            params
        });
    },

    async createAccountWithCustomer(data: any) {
        return apiHelper({
            url: '/accounts/create-with-customer',
            method: 'POST',
            data
        });
    },

    async getAccountBalance(id: string) {
        return apiHelper({
            url: `/accounts/${id}/balance`,
            method: 'GET'
        });
    },

    async updateStatus(id: string, status: string) {
        return apiHelper({
            url: `/accounts/${id}/status`,
            method: 'PATCH',
            data: { status }
        });
    }
};
