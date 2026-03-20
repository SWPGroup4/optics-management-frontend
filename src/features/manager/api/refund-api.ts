import { api } from "@/lib/axios";
import type { Order } from "@/features/manager/api/order-api";

export interface RefundItem {
    refundId: string;
    order: Order;
}

const toOrder = (raw: unknown): Order | null => {
    if (!raw || typeof raw !== "object") return null;

    const candidate = raw as Record<string, unknown>;
    const nestedOrder = candidate.order;
    const source = (nestedOrder && typeof nestedOrder === "object"
        ? nestedOrder
        : candidate) as Record<string, unknown>;

    const orderId = source.orderId;
    if (typeof orderId !== "string" || !orderId.trim()) return null;

    return source as unknown as Order;
};

const toOrders = (raw: unknown): Order[] => {
    if (!Array.isArray(raw)) return [];

    return raw
        .map(toOrder)
        .filter((order): order is Order => order !== null);
};

const toRefundItem = (raw: unknown): RefundItem | null => {
    if (!raw || typeof raw !== "object") return null;

    const candidate = raw as Record<string, unknown>;
    const refundId = candidate.refundId;
    const order = toOrder(candidate.order);

    if (typeof refundId !== "string" || !refundId.trim() || !order) return null;

    return { refundId, order };
};

const toRefundItems = (raw: unknown): RefundItem[] => {
    if (!Array.isArray(raw)) return [];

    return raw
        .map(toRefundItem)
        .filter((refund): refund is RefundItem => refund !== null);
};

export const refundApi = {
    // Bước 1: Vô hiệu hóa variant (NSX hủy)
    inActivateVariant: async (variantId: string): Promise<void> => {
        await api.patch(`/refund/variant/${variantId}/in-activate`);
    },

    // Bước 2: Lấy danh sách đơn bị ảnh hưởng
    getAffectedOrders: async (variantId: string): Promise<Order[]> => {
        const res = await api.get(`/refund/affected-orders/${encodeURIComponent(variantId)}`);
        const data = res.data;

        if (Array.isArray(data)) return toOrders(data);
        if (Array.isArray(data?.result)) return toOrders(data.result);
        if (Array.isArray(data?.data)) return toOrders(data.data);
        if (Array.isArray(data?.items)) return toOrders(data.items);

        return [];
    },

    // [Khách hủy] Lấy đơn đã hủy có thanh toán thành công
    getCancelledPaidOrders: async (): Promise<Order[]> => {
        const res = await api.get(`/management/orders/cancelled/paid`);
        const data = res.data;

        // Log để debug
        console.log("getCancelledPaidOrders raw:", JSON.stringify(data));

        // Array trực tiếp
        if (Array.isArray(data)) return toOrders(data);
        // { result: [...] }
        if (Array.isArray(data?.result)) return toOrders(data.result);
        // { data: [...] }
        if (Array.isArray(data?.data)) return toOrders(data.data);
        // { result: { content: [...] } } — phân trang
        if (Array.isArray(data?.result?.content)) return toOrders(data.result.content);
        // { result: { items: [...] } }
        if (Array.isArray(data?.result?.items)) return toOrders(data.result.items);
        // Object đơn lẻ (1 đơn) → bọc thành array
        if (data?.result && typeof data.result === "object" && !Array.isArray(data.result)) {
            const order = toOrder(data.result);
            return order ? [order] : [];
        }

        return [];
    },

    // Bước 3: Tạo batch hoàn tiền
    createBatch: async (orderIds: string[]): Promise<RefundItem[]> => {
        const res = await api.post(`/refund/create-batch`, { orderIds });
        return toRefundItems(res.data?.result);
    },

    // Bước 4: Lấy danh sách refund sẵn sàng xử lý
    getReadyRefunds: async (): Promise<RefundItem[]> => {
        const res = await api.get(`/refund/ready`);
        return toRefundItems(res.data?.result);
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