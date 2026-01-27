import { create } from "zustand";
import { profileApi } from "../api/api";
import type {  ProfileStore, UserProfile } from "../types";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/api-error";

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await profileApi.getProfile();
      
      // Ép kiểu dữ liệu trả về dựa trên cấu trúc ApiResponse chung của bạn
      // Giả sử response đã qua axios interceptor và trả về data.result
      const data = response as unknown as { result: UserProfile };
      
      set({ profile: data.result, isLoading: false });
    } catch (err: unknown) {
      let errorMessage = "Không thể lấy thông tin cá nhân";

      // Kiểm tra nếu lỗi là từ Axios
      if (err instanceof AxiosError) {
        const serverData = err.response?.data as ApiErrorResponse;
        errorMessage = serverData?.message || serverData?.result || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      set({ 
        error: errorMessage, 
        isLoading: false 
      });
    }
  },

  clearProfile: () => set({ profile: null, error: null }),
}));