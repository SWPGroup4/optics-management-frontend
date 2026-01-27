import { api } from "@/lib/axios";
export const profileApi = {
  // 1. Lấy thông tin cá nhân
  getProfile: () => {
    return api.get('/users/me');
  },

  // 2. Cập nhật thông tin cá nhân
  updateProfile: (data: FormData) => {
    return api.put('/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 3. Thay đổi mật khẩu
  changePassword: (data: { currentPassword: string; newPassword: string }) => {
    return api.post('/profile/change-password', data);
  },

  // 4. Lấy đơn hàng của người dùng
  getOrders: () => {
    return api.get('/profile/orders');
  },

  // 5. Lấy địa chỉ của người dùng
  getAddresses: () => {
    return api.get('/profile/addresses');
  },

};      