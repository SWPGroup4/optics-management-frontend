import { create } from "zustand";
import { orderApi, type Order } from "@/features/manager/api/order-api";
import { AxiosError } from "axios";

interface OrderStore {
    orders: Order[];
    isLoading: boolean;
    error: string | null;

    fetchOrders: () => Promise<void>;
    fetchOrderById: (orderId: string) => Promise<Order | null>;
    deleteOrder: (orderId: string) => Promise<void>;
    filterByStatus: (status: string) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set) => ({
    orders: [],
    isLoading: false,
    error: null,

    fetchOrders: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await orderApi.getOrders();
            set({ orders: data, isLoading: false });
        } catch (err: unknown) {
            let errorMessage = "Failed to fetch orders";

            if (err instanceof AxiosError) {
                const serverData = err.response?.data;
                errorMessage = serverData?.message || serverData?.result || err.message;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            set({ error: errorMessage, isLoading: false });
        }
    },

    fetchOrderById: async (orderId: string): Promise<Order | null> => {
        set({ error: null });
        try {
            const order = await orderApi.getOrderById(orderId);
            return order;
        } catch (err: unknown) {
            let errorMessage = "Failed to fetch order";

            if (err instanceof AxiosError) {
                const serverData = err.response?.data;
                errorMessage = serverData?.message || serverData?.result || err.message;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            set({ error: errorMessage });
            return null;
        }
    },

    deleteOrder: async (orderId: string) => {
        try {
            await orderApi.deleteOrder(orderId);

            set((state) => ({
                orders: state.orders.filter((order) => order.orderId !== orderId),
            }));
        } catch (err: unknown) {
            let errorMessage = "Failed to delete order";

            if (err instanceof AxiosError) {
                const serverData = err.response?.data;
                errorMessage = serverData?.message || serverData?.result || err.message;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            set({ error: errorMessage });
            throw err;
        }
    },

    filterByStatus: async (status: string) => {
        set({ isLoading: true, error: null });
        try {
            const data = await orderApi.filterOrdersByStatus(status);
            set({ orders: data, isLoading: false });
        } catch (err: unknown) {
            let errorMessage = "Failed to filter orders";

            if (err instanceof AxiosError) {
                const serverData = err.response?.data;
                errorMessage = serverData?.message || serverData?.result || err.message;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            set({ error: errorMessage, isLoading: false });
        }
    },
}));