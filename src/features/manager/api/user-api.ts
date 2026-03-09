import { api } from "@/lib/axios";

export const userApi = {
  getUsersByRole: async (role: 'SALE' | 'CUSTOMER') => {
    const response = await api.get(`/users`, { params: { role } });
    return response.data.result || [];
  },

  // Thêm Staff mới
  createStaff: async (payload: any) => {
    // Thường backend yêu cầu password, role mặc định là SALE
    const body = {
      ...payload,
      role: 'SALE'
    };
    const response = await api.post('/users', body);
    return response.data;
  },

  // Xóa Staff
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};