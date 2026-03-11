import { api } from '@/lib/axios';
import type { BEOrder } from "@/features/operation-staff/types/types";

export const shipperApi = {
    getReadyToShipOrders: async (): Promise<BEOrder[]> => {
        const response = await api.get('/management/orders?status=READY_TO_SHIP');
        return response.data.result;
    },

    startDelivery: async (orderId: string, shipperId: string): Promise<void> => {
        const response = await api.post(`/ship/orders/${orderId}/start-delivery?shipperId=${shipperId}`);
        return response.data;
    },
};