import { api } from "@/lib/axios";
import type { Order } from "@/features/manager/api/order-api";

export interface RefundItem {
    refundId: string;
    order: Order;
}

export const refundApi = {
    // Bước 1: Vô hiệu hóa variant (NSX hủy)
    inActivateVariant: async (variantId: string): Promise<void> => {
        await api.patch(`/refund/variant/${variantId}/in-activate`);
    },

    // Bước 2: Lấy danh sách đơn bị ảnh hưởng
    getAffectedOrders: async (variantId: string): Promise<Order[]> => {
        const res = await api.get(`/refund/affected-orders/${variantId}`);
        return res.data.result ?? [];
    },

    // Bước 3: Tạo batch hoàn tiền
    createBatch: async (variantId: string): Promise<void> => {
        await api.post(`/refund/create-batch`, { variantId });
    },

    // Bước 4: Lấy danh sách refund sẵn sàng xử lý
    getReadyRefunds: async (): Promise<RefundItem[]> => {
        const res = await api.get(`/refund/ready`);
        return res.data.result ?? [];
    },

    // Bước 5: Xác nhận hoàn tiền → trả về paymentUrl VNPay
    checkoutRefund: async (refundId: string): Promise<string | null> => {
        const res = await api.post(`/refund/${refundId}/refund-checkout`);
        // API có thể trả về URL dạng string trực tiếp, hoặc { paymentUrl: "..." }, hoặc { result: "..." }
        const data = res.data;
        if (typeof data === "string") return data;
        if (typeof data?.result === "string") return data.result;
        if (typeof data?.paymentUrl === "string") return data.paymentUrl;
        if (typeof data?.data === "string") return data.data;
        return null;
    },
};