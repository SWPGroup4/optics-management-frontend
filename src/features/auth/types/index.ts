import { z } from "zod";

// ==========================================
// 1. ZOD SCHEMAS (Dùng để Validate dữ liệu)
// ==========================================

// --- Schema cho Login Form ---
export const LoginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập tên đăng nhập"), // Backend check lỏng thì FE cũng check lỏng
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

// Type suy luận từ Schema (Dùng cho React Hook Form)
export type LoginInput = z.infer<typeof LoginSchema>;


// --- Schema cho JWT Payload ---
// Dùng để kiểm tra dữ liệu bên trong Token sau khi decode
export const JwtPayloadSchema = z.object({
  sub: z.string(), // Username
  scope: z.string(), // Chuỗi chứa Roles
  userId: z.string().optional(), // Các trường này optional vì backend có thể chưa trả về
  fullName: z.string().optional(),
  exp: z.number(),
  iat: z.number(),
  jti: z.string(),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;


// ==========================================
// 2. INTERFACES (Dùng cho TypeScript)
// ==========================================

// --- API Response ---
export interface AuthResponse {
  token: string;
  authenticated: boolean;
}

// --- User Entity ---
export interface UserState {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operations' | 'sales' | 'customer' | 'staff';
  avatar?: string;
}

// --- Store State ---
// Định nghĩa toàn bộ State và Action của Store
export interface AuthStore {
  user: UserState | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (username: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}
export interface ApiResponse<T> {
  code: number;
  result: T;
}