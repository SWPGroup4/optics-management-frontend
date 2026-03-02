import { create } from 'zustand';
import type { OrderDetail, DrawerState } from '@/features/manager/types/dashboard';

interface OrderDrawerStore extends DrawerState {
    openDrawer: (order: OrderDetail) => void;
    closeDrawer: () => void;
    setSelectedOrder: (order: OrderDetail | null) => void;
}

export const useOrderDrawerStore = create<OrderDrawerStore>((set) => ({
    isOpen: false,
    selectedOrder: null,

    openDrawer: (order) => set({ isOpen: true, selectedOrder: order }),
    closeDrawer: () => set({ isOpen: false, selectedOrder: null }),
    setSelectedOrder: (order) => set({ selectedOrder: order }),
}));