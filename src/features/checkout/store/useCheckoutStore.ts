import { create } from 'zustand';

// ==========================================
// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU (INTERFACE)
// ==========================================
interface CheckoutState {
  // State quản lý bước hiện tại (1, 2, 3)
  step: number;
  
  // State quản lý dữ liệu form
  shippingData: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;  // Bỏ dấu ? để đảm bảo luôn là string (tránh undefined)
    state: string; // Bỏ dấu ?
    zip: string;   // Bỏ dấu ?
    phone: string; // Thêm vào
    email: string; // Thêm vào
  };
  paymentMethod: string;
  
  // Các Actions (Hàm xử lý)
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setPaymentMethod: (method: string) => void;
  updateShippingData: (data: Partial<CheckoutState['shippingData']>) => void;
  resetCheckout: () => void;
}

// ==========================================
// 2. KHỞI TẠO STORE
// ==========================================
export const useCheckoutStore = create<CheckoutState>((set) => ({
  step: 1,
  
  // Khởi tạo giá trị mặc định là rỗng '' (Best practice cho Form Input)
  shippingData: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: ''
  },
  paymentMethod: 'VNPAY',

  // Chuyển đến bước cụ thể (dùng cho nút Edit)
  setStep: (step) => set({ step }),

  // Tiến 1 bước (Max là 3)
  nextStep: () => set((state) => ({ 
    step: Math.min(state.step + 1, 3) 
  })),

  // Lùi 1 bước (Min là 1)
  prevStep: () => set((state) => ({ 
    step: Math.max(state.step - 1, 1) 
  })),

  // Cập nhật dữ liệu form (Merge dữ liệu cũ với mới)
  updateShippingData: (data) => set((state) => ({
    shippingData: { ...state.shippingData, ...data }
  })),
setPaymentMethod: (method) => set({ paymentMethod: method }),
  // Reset về trạng thái ban đầu
  resetCheckout: () => set({ 
    step: 1, 
    shippingData: { 
      firstName: '', 
      lastName: '', 
      address: '', 
      city: '', 
      state: '', 
      zip: '', 
      phone: '', 
      email: '' 
    } 
  }),
}));