import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from "jwt-decode";
import { AxiosError } from 'axios';
import { authApi } from '../api/auth-api';
// Đảm bảo ApiResponse và ApiError đã được định nghĩa trong types
import { JwtPayloadSchema, type AuthStore, type UserState, type ApiResponse, type RegisterInput } from '../types';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (username, password) => {
        set({ isLoading: true });
        try {
          const response = await authApi.login({ username, password });

          if (!response.authenticated || !response.token) {
             throw new Error("Xác thực thất bại");
          }

          const decodedRaw = jwtDecode(response.token);
          const decoded = JwtPayloadSchema.parse(decodedRaw);

          let userRole: UserState['role'] = 'customer';
          const scope = decoded.scope || "";
          
          if (scope.includes("ROLE_ADMIN")) userRole = 'admin';
          else if (scope.includes("ROLE_OPERATIONS")) userRole = 'operations';
          else if (scope.includes("ROLE_SALES")) userRole = 'sales';
          else if (scope.includes("ROLE_STAFF")) userRole = 'staff';

          const userObj: UserState = {
            id: decoded.userId ?? decoded.sub, 
            name: decoded.fullName ?? decoded.sub, 
            email: decoded.sub,
            role: userRole,
            avatar: `https://ui-avatars.com/api/?name=${decoded.fullName ?? decoded.sub}&background=random`,
          };
          
          set({
            user: userObj,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });

        } catch (error: unknown) {
          set({ isLoading: false });
          throw error; 
        }
      },

      registerUser: async (data : RegisterInput) => {
        set({ isLoading: true });
        try {
          await authApi.register(data);
          set({ isLoading: false });
        } catch (error: unknown) {
          set({ isLoading: false });

          if (error instanceof AxiosError) {
             // Backend Spring Boot thường trả về format: { code: 1008, message: "..." }
             // Chúng ta ép kiểu về ApiResponse<any> để lấy message
             const serverData = error.response?.data as ApiResponse<null>;
             
             // Ném lỗi ra ngoài. Ta có thể ném cả object nếu muốn Hook xử lý theo code 1008
             // Ở đây ta ném message để UI hiển thị trực tiếp
             throw new Error(serverData?.result || "Đăng ký thất bại");
          }

          if (error instanceof Error) throw error;
          throw new Error("Có lỗi xảy ra khi tạo tài khoản");
        }
      },
      
      logout: async () => {
        const currentToken = get().token;
        if (currentToken) {
            try { await authApi.logout({ token: currentToken }); } 
            catch (err) { console.warn("Lỗi logout server (bỏ qua):", err); }
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'optic-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);