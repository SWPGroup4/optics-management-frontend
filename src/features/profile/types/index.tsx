export interface Permission {
  name: string;
  description: string;
}

export interface Role {
  name: string;
  description: string;
  permissions: Permission[];
}

export interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dob: string;      // Backend trả về chuỗi "2026-01-27"
  imageUrl: string;
  email: string;
  phone: string;
  roles: Role[];    // Đây là mảng các đối tượng Role
}

export interface ProfileStore {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  
  // Action để gọi API lấy thông tin
  fetchProfile: () => Promise<void>;
  
  // Action để xóa thông tin (dùng khi logout)
  clearProfile: () => void;
}
