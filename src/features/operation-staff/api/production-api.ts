import { api } from '@/lib/axios';
import type { Order } from '../types';

export const productionApi = {
  getProcessingOrders: async (): Promise<Order[]> => {
    const response = await api.get('/management/orders');
    return response.data.result;
  },

  startOrder: async (orderId: string): Promise<Order> => {
    const response = await api.put(`/production/orders/${orderId}/start`);
    return response.data.result;
  },

  finishOrder: async (orderId: string): Promise<Order> => {
    const response = await api.put(`/production/orders/${orderId}/finish`);
    return response.data.result;
  },

  updateItemStatus: async (orderItemId: string, status: string): Promise<Order> => {
    const response = await api.put(`/production/orders/items/${orderItemId}/status`, {
      status,
    });
    return response.data.result;
  },
};
