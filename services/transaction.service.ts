import { apiHelper } from './api-helper';

export const transactionService = {
    async getTransactions(params?: any) {
        return apiHelper({
            url: '/transactions',
            method: 'GET',
            params
        });
    },

    async deposit(data: any) {
        return apiHelper({
            url: '/transactions/deposit',
            method: 'POST',
            data
        });
    },

    async withdraw(data: any) {
        return apiHelper({
            url: '/transactions/withdraw',
            method: 'POST',
            data
        });
    },

    async transfer(data: any) {
        return apiHelper({
            url: '/transactions/transfer',
            method: 'POST',
            data
        });
    },

    async getStats() {
        return apiHelper({
            url: '/transactions/stats',
            method: 'GET'
        });
    }
};
