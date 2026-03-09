import { api } from "@/lib/axios";

export type UserRole = 'SALE' | 'OPERATION' | 'SHIPPER' | 'CUSTOMER';

export const userApi = {
  getUsersByRole: async (role: UserRole) => {
    const response = await api.get(`/users`, { params: { role } });
    return response.data.result || [];
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};