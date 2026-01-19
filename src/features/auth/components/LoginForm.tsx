import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react"; // Thêm icon Loader
import { useLoginForm } from "../hooks/useLoginForm";

export default function LoginForm() {
  // 1. Lấy logic từ Hook mới (React Hook Form)
  const { form, onSubmit, isLoading } = useLoginForm();
  
  // 2. Trích xuất các hàm cần thiết từ form instance
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div className="w-full">
      
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Welcome back</h2>
        <p className="text-gray-500 text-sm font-medium">Please enter your details to sign in.</p>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Hiển thị lỗi chung (VD: Sai tài khoản/mật khẩu) */}
        {errors.root && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium text-center border border-red-100">
            {errors.root.message}
          </div>
        )}

        {/* Username Field */}
        <div className="space-y-2">
          <Label className="sr-only" htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="USERNAME / EMAIL"
            disabled={isLoading}
            // --- KẾT NỐI VỚI HOOK FORM ---
            {...register("username")} 
            // ------------------------------
            className={`rounded-2xl h-14 px-6 bg-gray-50 border-transparent 
              focus:bg-white focus:ring-4 focus:ring-gray-100 transition-all 
              text-sm font-medium tracking-wide placeholder:text-gray-400
              ${errors.username ? "border-red-500 focus:ring-red-100" : "focus:border-gray-200"}`}
          />
          {errors.username && (
            <p className="text-xs text-red-500 px-4 mt-1 font-medium animate-pulse">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label className="sr-only" htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="PASSWORD"
            disabled={isLoading}
            // --- KẾT NỐI VỚI HOOK FORM ---
            {...register("password")}
            // ------------------------------
            className={`rounded-2xl h-14 px-6 bg-gray-50 border-transparent 
              focus:bg-white focus:ring-4 focus:ring-gray-100 transition-all 
              text-sm font-medium tracking-wide placeholder:text-gray-400
              ${errors.password ? "border-red-500 focus:ring-red-100" : "focus:border-gray-200"}`}
          />
          {errors.password && (
            <p className="text-xs text-red-500 px-4 mt-1 font-medium animate-pulse">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-14 rounded-full bg-zinc-900 hover:bg-black text-white font-bold tracking-widest transition-all shadow-lg shadow-zinc-900/20 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <span>LOGGING IN...</span>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                <span>LOGIN</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Extra Links */}
        <div className="flex justify-center items-center gap-6 text-[11px] text-gray-400 font-semibold tracking-wider uppercase mt-4">
          <a href="#" className="hover:text-zinc-900 transition-colors">Forgot Password</a>
          <span className="text-gray-300">•</span>
          <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
        </div>

        {/* FOOTER (Sign Up) */}
        <div className="relative mt-8 pt-8 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-zinc-900 hover:text-emerald-600 transition-colors inline-flex items-center gap-1 hover:underline underline-offset-4">
                Sign up for free
              </Link>
            </p>
        </div>

      </form>
    </div>
  )
}