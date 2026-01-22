// src/features/auth/api/auth-api.ts
import { api } from "@/lib/axios";
import type { LoginInput, RegisterInput, AuthResponse, ApiResponse, UserRegistrationResult } from "../types";

export interface LogoutRequest {
  token: string;
}

export const authApi = {
  // 1. Login
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data) as ApiResponse<AuthResponse>;
    return response.result; 
  },

  // 2. Register (MỚI)
  // Gửi đúng cấu trúc: { username, password, firstName, lastName, dob }
  register: async (data: RegisterInput): Promise<UserRegistrationResult> => {
    // Ép kiểu ApiResponse với Result cụ thể
    const response = await api.post('/users/registration', data) as ApiResponse<UserRegistrationResult>;
    
    // Trả về kết quả từ Backend
    return response.result;
  },

  // 3. Logout
  logout: (data: LogoutRequest): Promise<void> => {
    return api.post('/auth/logout', data);
  },
  
  // 4. Refresh token
  refreshToken: (token: string) => {
    return api.post('/auth/refresh', { token });
  },
};