import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { 
  RegisterSchema, 
  type RegisterInput 
} from "../types";
import { useAuthStore } from "../stores/useAuthStore";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.registerUser);
  const isLoading = useAuthStore((state) => state.isLoading);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      dob: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser(data);
      // Đăng ký xong thì chuyển trang luôn
      navigate("/auth/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const msg = error.message;

        // Bắt lỗi tuổi (Mã 1008 từ Backend)
        if (msg.toLowerCase().includes("age") || msg.includes("18")) {
          form.setError("dob", { message: msg });
        } 
        // Bắt lỗi Username đã tồn tại
        else if (msg.toLowerCase().includes("username") || msg.includes("exists")) {
          form.setError("username", { message: "Username đã được sử dụng" });
        }
        // Tất cả các lỗi khác đẩy vào 'root'
        else {
          form.setError("root", { message: msg });
        }
      }
    }
  };

  return {
    form,
    // Trả về luôn handleSubmit để Component dùng cho gọn
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
  };
};