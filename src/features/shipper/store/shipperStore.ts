import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { shipperApi } from "@/features/shipper/api/shipper-api.ts";
import type { BEOrder } from "@/features/operation-staff/types/types";

interface ShipperStore {
    // State
    readyToShipOrders: BEOrder[];
    loading: boolean;
    error: string | null;

    // Actions
    fetchReadyToShipOrders: () => Promise<void>;
    startDelivery: (orderId: string, shipperId: string) => Promise<void>;
    clearError: () => void;
}

export const useShipperStore = create<ShipperStore>()(
    devtools(
        (set) => ({
            // Initial state
            readyToShipOrders: [],
            loading: false,
            error: null,

            fetchReadyToShipOrders: async () => {
                set({ loading: true, error: null });
                try {
                    const response = await shipperApi.getReadyToShipOrders();
                    set({
                        readyToShipOrders: response,
                        loading: false
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to fetch ready to ship orders',
                        loading: false
                    });
                }
            },

            startDelivery: async (orderId: string, shipperId: string) => {
                set({ loading: true, error: null });
                try {
                    await shipperApi.startDelivery(orderId, shipperId);

                    // Refresh the order list after successful action
                    const response = await shipperApi.getReadyToShipOrders();
                    set({
                        readyToShipOrders: response,
                        loading: false
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to start delivery',
                        loading: false
                    });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'shipper-store',
        }
    )
);