import { api } from "@/lib/axios";

export interface Order {
    customerId: string;
    orderId: string;
    deliveryAddress: string;
    phoneNumber: string;
    orderStatus: "PENDING" | "ON_HOLD" | "CONFIRMED" | "PROCESSING" | "PRODUCED" | "SHIPPED" | "COMPLETED" | "CANCELLED";
    totalAmount: number;
    depositAmount: number;
    items: OrderItem[];
}

export interface OrderItem {
    productVariantId: string;
    orderItemType: "IN_STOCK" | "PREORDER";
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    status: "IN_PRODUCTION" | "COMPLETED" | "PENDING";
    prescription?: {
        id: string;
        odSphere: number;
        odCylinder: number;
        odAxis: number;
        odAdd: number;
        odPd: number;
        osSphere: number;
        osCylinder: number;
        osAxis: number;
        osAdd: number;
        osPd: number;
        note: string;
    };
}

export const orderApi = {
    getOrders: async (): Promise<Order[]> => {
        const response = await api.get('/management/orders');
        return response.data.result;
    },

    getOrderById: async (orderId: string): Promise<Order> => {
        const response = await api.get(`/management/orders/${orderId}`);
        return response.data.result;
    },

    deleteOrder: async (orderId: string): Promise<void> => {
        await api.delete(`/management/orders/${orderId}`);
    },

    filterOrdersByStatus: async (status: string): Promise<Order[]> => {
        const response = await api.get(`/management/orders/filter?status=${status}`);
        return response.data.result;
    },
};