// src/features/auth/api/auth-api.ts
import { api } from "@/lib/axios";
// 1. Import Type từ file types chung mà chúng ta đã tạo ở bước trước
import type { LoginInput, AuthResponse, ApiResponse } from "../types";

// Định nghĩa body cho logout (chỉ dùng nội bộ ở đây cũng được)
export interface LogoutRequest {
  token: string;
}

export const authApi = {
  // 2. Login
  // Input: LoginInput (username, password)
  // Output: Promise<AuthResponse>
  login: async (data: LoginInput): Promise<AuthResponse> => {
    // 2. SỬA CÁCH GỌI API:
    // Thay vì api.post<any, ...> (bị lỗi lint), ta dùng "as" để ép kiểu kết quả trả về.
    // Vì interceptor của bạn đã trả về 'response.data', nên kết quả nhận được chính là cục JSON ApiResponse.
    
    const response = await api.post('/auth/login', data) as ApiResponse<AuthResponse>;
    
    // 3. Trả về phần result bên trong
    return response.result; 
  },
  // 3. Logout
  logout: (data: LogoutRequest): Promise<void> => {
    return api.post('/auth/logout', data);
  },
  
  // 4. Refresh token (Optional)
  refreshToken: (token: string) => {
    return api.post('/auth/refresh', { token });
  }
};