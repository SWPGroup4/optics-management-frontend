import { 
  User, Mail, MapPin, ShieldCheck, CheckCircle2, type LucideIcon,
  Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Dữ liệu giả lập
const INITIAL_DATA = {
  firstName: "Alex",
  lastName: "Vane",
  dob: "1985-12-04",
  gender: "male",
  email: "alex.vane@example.com",
  phone: "+1 (555) 012-3456",
  address: "123 Optical Lane, Suite 400, Vision City, CA 90210",
  isIdentityVerified: true,
  isEmailVerified: true,
};

const SectionTitle = ({ icon: Icon, title }: { icon: LucideIcon, title: string }) => (
  <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-6">
    <Icon className="w-4 h-4" />
    <span>{title}</span>
  </div>
);

export default function ProfilePage() {
  const data = INITIAL_DATA; 

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 space-y-10">
        
        {/* --- 1. HEADER & AVATAR --- */}
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex gap-6 items-center">
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-sm shrink-0">
              <img src="https://github.com/shadcn.png" alt="Avatar" className="h-full w-full object-cover" />
            </div>
            
            {/* User Info */}
            <div className="space-y-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{data.firstName} {data.lastName}</h1>
                <p className="text-sm text-gray-500">Customer since 2021</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="h-9">
                   Upload New
                </Button>
                <Button variant="ghost" size="sm" className="h-9 text-red-500 hover:text-red-600 hover:bg-red-50">
                   Remove
                </Button>
              </div>
            </div>
          </div>

          {/* Badge Verified */}
          {data.isIdentityVerified && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex gap-3 max-w-sm">
              <div className="mt-0.5 bg-emerald-100 p-1.5 rounded-full h-fit text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-900 text-sm">Identity Verified</h3>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                  Your identity has been verified by our opticians.
                </p>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* --- 2. IDENTITY FORM (READ ONLY) --- */}
        <div>
          <SectionTitle icon={User} title="Identity" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input defaultValue={data.firstName} className="h-11 bg-gray-50/50 text-gray-600" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input defaultValue={data.lastName} className="h-11 bg-gray-50/50 text-gray-600" readOnly />
            </div>
            
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input 
                type="date" 
                defaultValue={data.dob} 
                className="h-11 bg-gray-50/50 text-gray-600" 
                readOnly 
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <div className="relative">
                <select 
                  className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-gray-50/50 px-3 py-2 text-sm ring-offset-background focus:outline-none appearance-none text-gray-600 disabled:opacity-100"
                  defaultValue={data.gender}
                  disabled
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none opacity-30">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. CONTACT DETAILS (READ ONLY) --- */}
        <div>
          <SectionTitle icon={Mail} title="Contact Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative group">
                <Input defaultValue={data.email} className="h-11 bg-gray-50/50 pr-24 text-gray-600" readOnly />
                {data.isEmailVerified && (
                  <div className="absolute right-3 top-2.5 flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="relative">
                <Input defaultValue={data.phone} className="h-11 bg-gray-50/50 pr-24 text-gray-600" readOnly />
                <button className="absolute right-3 top-3 text-[11px] font-bold text-[#2A9D8F] hover:text-[#1e7a6f] transition uppercase tracking-wide">
                  Verify Now
                </button>
              </div>
            </div>
          </div>

          {/* --- Address Card (Đã Fix Lỗi Layout) --- */}
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 mt-6 flex items-start justify-between">
            <div className="flex gap-4">
              {/* Icon Container: shrink-0 giữ kích thước cố định */}
              <div className="bg-white h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 shadow-sm text-gray-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-gray-900">Primary Address</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed pr-2">
                  {data.address}
                </p>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#2A9D8F] -mt-1 shrink-0">
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}