import { useEffect } from "react";
import { 
  User, Mail, MapPin, ShieldCheck, CheckCircle2, type LucideIcon,
   Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useProfileStore } from "../store/useProfile";

// Import Store của bạn

const SectionTitle = ({ icon: Icon, title }: { icon: LucideIcon, title: string }) => (
  <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-6">
    <Icon className="w-4 h-4" />
    <span>{title}</span>
  </div>
);

export default function ProfilePage() {

  // 1. Lấy dữ liệu và các hàm từ store
  const { profile, isLoading, fetchProfile } = useProfileStore();

  // 2. Tự động load profile khi vào trang nếu chưa có dữ liệu
  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  // 3. Trạng thái đang tải dữ liệu
  if (isLoading && !profile) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Nếu không có dữ liệu (chưa đăng nhập hoặc lỗi)
  if (!profile) {
    return (
      <div className="p-8 text-center text-gray-500">
        Không tìm thấy thông tin cá nhân.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 space-y-10">
        
        {/* --- 1. HEADER & AVATAR --- */}
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex gap-6 items-center">
            {/* Avatar - Dùng imageUrl từ store */}
            <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-sm shrink-0">
              <img 
                src={profile.imageUrl || "https://ui-avatars.com/api/?name=" + profile.username} 
                alt="Avatar" 
                className="h-full w-full object-cover" 
              />
            </div>
            
            {/* User Info */}
            <div className="space-y-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-sm text-gray-500">@{profile.username}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="h-9">
                   Upload New
                </Button>
              </div>
            </div>
          </div>

          {/* Badge Verified (Ví dụ dựa trên sự tồn tại của ID) */}
          {profile.id && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex gap-3 max-w-sm">
              <div className="mt-0.5 bg-emerald-100 p-1.5 rounded-full h-fit text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-900 text-sm">Account Verified</h3>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                  Your identity is secured by our system roles: {profile.roles.map(r => r.name).join(", ")}.
                </p>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* --- 2. IDENTITY FORM --- */}
        <div>
          <SectionTitle icon={User} title="Identity" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input value={profile.firstName} className="h-11 bg-gray-50/50 text-gray-600" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input value={profile.lastName} className="h-11 bg-gray-50/50 text-gray-600" readOnly />
            </div>
            
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input 
                type="date" 
                value={profile.dob} 
                className="h-11 bg-gray-50/50 text-gray-600" 
                readOnly 
              />
            </div>
          </div>
        </div>

        {/* --- 3. CONTACT DETAILS --- */}
        <div>
          <SectionTitle icon={Mail} title="Contact Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative group">
                <Input value={profile.email} className="h-11 bg-gray-50/50 pr-24 text-gray-600" readOnly />
                <div className="absolute right-3 top-2.5 flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                   <CheckCircle2 className="w-3 h-3" /> Verified
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={profile.phone || "Not provided"} className="h-11 bg-gray-50/50 text-gray-600" readOnly />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 mt-6 flex items-start justify-between">
            <div className="flex gap-4">
              <div className="bg-white h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 shadow-sm text-gray-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">User Roles & Permissions</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.roles.map((role) => (
                    <span key={role.name} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-1 rounded border border-blue-100 font-bold uppercase">
                      {role.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}