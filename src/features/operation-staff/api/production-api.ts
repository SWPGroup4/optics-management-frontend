import { api } from '@/lib/axios';
import type { BEOrder, BEOrderItem } from "@/features/operation-staff/types/types";

export const productionApi = {
    getProcessingOrders: async (): Promise<BEOrder[]> => {
        const response = await api.get('/management/orders?status=PROCESSING');
        return response.data.result;
    },

    startOrder: async (orderId: string): Promise<BEOrder> => {
        const response = await api.put(`/production/orders/${orderId}/start`);
        return response.data.result;
    },

    finishOrder: async (orderId: string): Promise<BEOrder> => {
        const response = await api.put(`/production/orders/${orderId}/finish`);
        return response.data.result;
    },

    updateItemStatus: async (
        orderItemId: string,
        status: string
    ): Promise<BEOrderItem> => {
        const response = await api.put(`/production/orders/items/${orderItemId}/status?status=${status}`);
        return response.data.result;
    },

    getReadyToShipOrders: async (): Promise<BEOrder[]> => {
        const response = await api.get('/management/orders?status=PRODUCED');
        return response.data.result;
    },

    bulkReadyToShip: async (orderIds: string[]): Promise<void> => {
        const response = await api.put('/production/orders/ready-to-ship', {
            orderIds
        });
        return response.data;
    },
};