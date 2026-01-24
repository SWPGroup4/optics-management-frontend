import { create } from 'zustand';
import { type PrescriptionData, INITIAL_EYE_SPECS } from '@/types/prescription';

interface ProductState {
  // State
  orderType: 'buy-now' | 'pre-order' | 'custom';
  selectedLensId: string;
  prescription: PrescriptionData;
  isPrescriptionModalOpen: boolean;

  // Actions
  setOrderType: (type: 'buy-now' | 'pre-order' | 'custom') => void;
  setLensId: (id: string) => void;
  setPrescriptionModalOpen: (isOpen: boolean) => void;
  updatePrescription: (data: Partial<PrescriptionData>) => void;
  resetStore: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  orderType: 'buy-now',
  selectedLensId: 'standard',
  
  prescription: {
    imageUrl: null,
    od: { ...INITIAL_EYE_SPECS },
    os: { ...INITIAL_EYE_SPECS },
    notes: ''
  },
  
  isPrescriptionModalOpen: false,

  setOrderType: (type) => set({ orderType: type }),
  setLensId: (id) => set({ selectedLensId: id }),
  setPrescriptionModalOpen: (isOpen) => set({ isPrescriptionModalOpen: isOpen }),
  
  updatePrescription: (data) => set((state) => ({
    prescription: { ...state.prescription, ...data }
  })),

  resetStore: () => set({ 
    orderType: 'buy-now', 
    selectedLensId: 'standard',
    prescription: { 
      imageUrl: null, 
      od: { ...INITIAL_EYE_SPECS }, 
      os: { ...INITIAL_EYE_SPECS }, 
      notes: '' 
    }
  })
}));