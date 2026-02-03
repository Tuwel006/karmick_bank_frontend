import { apiHelper } from './api-helper';

export const branchService = {
    async getBranches(params?: any) {
        return apiHelper({
            url: '/branches',
            method: 'GET',
            params
        });
    },

    async createBranch(data: any) {
        return apiHelper({
            url: '/branches',
            method: 'POST',
            data
        });
    },

    async getBranchById(id: string) {
        return apiHelper({
            url: `/branches/${id}`,
            method: 'GET'
        });
    },

    async updateBranch(id: string, data: any) {
        return apiHelper({
            url: `/branches/${id}`,
            method: 'PATCH',
            data
        });
    },

    async deleteBranch(id: string) {
        return apiHelper({
            url: `/branches/${id}`,
            method: 'DELETE'
        });
    }
};
