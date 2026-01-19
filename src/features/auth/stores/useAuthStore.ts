import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from "jwt-decode";
import { AxiosError } from 'axios';
import { z } from "zod"; 
import { authApi } from '../api/auth-api';
import { JwtPayloadSchema, type AuthStore, type UserState } from '../types'; // Import thêm type UserState nếu nó nằm bên types




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

          // 1. Decode token
          const decodedRaw = jwtDecode(response.token);
          
          // 2. Validate bằng Zod
          // Lưu ý: Đảm bảo Schema bên types/index.ts để userId và fullName là .optional() 
          // nếu Backend chưa làm xong tính năng đó.
          const decoded = JwtPayloadSchema.parse(decodedRaw);

          // 3. Logic Map Role
          let userRole: UserState['role'] = 'customer';
          const scope = decoded.scope || "";
          
          if (scope.includes("ROLE_ADMIN")) userRole = 'admin';
          else if (scope.includes("ROLE_OPERATIONS")) userRole = 'operations';
          else if (scope.includes("ROLE_SALES")) userRole = 'sales';
          else if (scope.includes("ROLE_STAFF")) userRole = 'staff';

          // 4. Set User Data
          // Fallback an toàn: Nếu backend chưa trả userId/fullName thì dùng sub (username) tạm
          const userObj: UserState = {
            id: decoded.userId ?? decoded.sub, 
            name: decoded.fullName ?? decoded.sub, 
            email: decoded.sub, // Tạm dùng sub làm email
            role: userRole,
            avatar: `https://ui-avatars.com/api/?name=${decoded.fullName ?? decoded.sub}&background=random`,
          };
          
          set({
            user: userObj,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });

        } catch (error) {
          set({ isLoading: false });

          // 1. Lỗi Validation từ Zod (Token sai cấu trúc)
          if (error instanceof z.ZodError) {
             console.error("Lỗi cấu trúc Token:", error.cause);
             // Chỉ hiện lỗi chung chung cho user, chi tiết xem console
             throw new Error("Dữ liệu đăng nhập không hợp lệ. Vui lòng thử lại sau.");
          }

          // 2. Lỗi từ API (Backend trả về lỗi 4xx, 5xx)
          if (error instanceof AxiosError) {
             // Backend Spring Boot thường trả message trong response.data.message
             const msg = error.response?.data?.message || error.response?.data;
             
             if (msg && typeof msg === 'string') {
                 throw new Error(msg);
             }
             // Nếu data là object phức tạp
             if (error.response?.data) {
                 throw error.response.data; // Ném cả cục object để component tự xử
             }
             
             throw new Error("Lỗi kết nối máy chủ (" + error.code + ")");
          }

          // 3. Lỗi do mình tự throw (new Error(...))
          if (error instanceof Error) {
              throw error;
          }

          throw new Error("Đăng nhập thất bại không rõ nguyên nhân");
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