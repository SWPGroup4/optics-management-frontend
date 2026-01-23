import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus, AlertCircle } from "lucide-react"; 
import { useRegisterForm } from "../hooks/useRegisterForm";

export default function RegisterForm() {
  const { form, onSubmit, isLoading } = useRegisterForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="w-full max-w-[480px] mx-auto transition-all duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-zinc-900 mb-3 tracking-tight">Create Account</h2>
        <p className="text-gray-500 text-base font-medium">Join our premium eyewear community today.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        
        {/* LỖI TỔNG QUÁT TỪ SERVER */}
        {errors.root && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{errors.root.message}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              placeholder="FIRST NAME"
              disabled={isLoading}
              {...register("firstName")}
              className={`rounded-2xl h-14 px-6 bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all text-sm font-medium ${errors.firstName ? "border-red-500" : "focus:border-gray-200"}`}
            />
            {errors.firstName && <p className="text-[10px] text-red-500 px-2 italic font-medium">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <Input
              placeholder="LAST NAME"
              disabled={isLoading}
              {...register("lastName")}
              className={`rounded-2xl h-14 px-6 bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all text-sm font-medium ${errors.lastName ? "border-red-500" : "focus:border-gray-200"}`}
            />
            {errors.lastName && <p className="text-[10px] text-red-500 px-2 italic font-medium">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Input
            placeholder="USERNAME"
            disabled={isLoading}
            {...register("username")}
            className={`rounded-2xl h-14 px-6 bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all text-sm font-medium ${errors.username ? "border-red-500" : "focus:border-gray-200"}`}
          />
          {errors.username && <p className="text-[10px] text-red-500 px-4 italic font-medium">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-gray-400 ml-4 tracking-widest uppercase" htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            disabled={isLoading}
            {...register("dob")}
            className={`rounded-2xl h-14 px-6 bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all text-sm font-medium uppercase ${errors.dob ? "border-red-500" : "focus:border-gray-200"}`}
          />
          {errors.dob && <p className="text-[10px] text-red-500 px-4 italic font-medium">{errors.dob.message}</p>}
        </div>

        <div className="space-y-2">
          <Input
            id="password"
            type="password"
            placeholder="PASSWORD"
            disabled={isLoading}
            {...register("password")}
            className={`rounded-2xl h-14 px-6 bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all text-sm font-medium ${errors.password ? "border-red-500" : "focus:border-gray-200"}`}
          />
          {errors.password && <p className="text-[10px] text-red-500 px-4 italic font-medium">{errors.password.message}</p>}
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-16 rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold tracking-[0.15em] transition-all shadow-xl shadow-zinc-900/20 flex items-center justify-center gap-3 active:scale-[0.97] text-base"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>CREATE ACCOUNT</span>
                <UserPlus className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>

        <div className="relative mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/auth/login" className="font-bold text-zinc-900 hover:text-emerald-600 transition-colors underline-offset-8 hover:underline">
                Sign in
              </Link>
            </p>
        </div>
      </form>
    </div>
  )
}