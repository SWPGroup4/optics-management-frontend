import { useState, useCallback } from "react";
import { refundApi, type RefundItem } from "@/features/manager/api/refund-api";
import type { Order } from "@/features/manager/api/order-api";

// ─── Hook 1: Danh sách refund sẵn sàng ───────────────────────────────────────
export function useReadyRefunds() {
    const [refunds, setRefunds] = useState<RefundItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await refundApi.getReadyRefunds();
            setRefunds(data);
        } catch (e: any) {
            setError(e.message ?? "Lỗi tải danh sách hoàn tiền");
        } finally {
            setLoading(false);
        }
    }, []);

    const append = useCallback((items: RefundItem[]) => {
        setRefunds(prev => {
            const map = new Map(prev.map(r => [r.refundId, r]));
            items.forEach(r => map.set(r.refundId, r));
            return Array.from(map.values());
        });
    }, []);

    return { refunds, loading, error, fetch, append };
}

// ─── Hook 2: Vô hiệu hóa variant + lấy đơn bị ảnh hưởng ─────────────────────
export function useInActivateVariant() {
    const [affectedOrders, setAffectedOrders] = useState<Order[]>([]);
    const [loading, setLoading]               = useState(false);
    const [error, setError]                   = useState<string | null>(null);

    const run = useCallback(async (variantId: string) => {
        setLoading(true);
        setError(null);
        try {
            await refundApi.inActivateVariant(variantId);
            const orders = await refundApi.getAffectedOrders(variantId);
            setAffectedOrders(orders);
            return orders;
        } catch (e: any) {
            const msg = e.message ?? "Lỗi khi vô hiệu hóa variant";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => setAffectedOrders([]), []);

    return { affectedOrders, loading, error, run, reset };
}

// ─── Hook 3: Tạo batch hoàn tiền ─────────────────────────────────────────────
export function useCreateRefundBatch() {
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);

    const run = useCallback(async (orders: Order[]) => {
        const orderIds = orders
            .map(o => o.orderId)
            .filter((id): id is string => Boolean(id));

        if (orderIds.length === 0) throw new Error("Không có orderId hợp lệ");

        setLoading(true);
        setError(null);
        try {
            const created = await refundApi.createBatch(orderIds);
            return created;
        } catch (e: any) {
            const msg = e.message ?? "Lỗi khi tạo batch hoàn tiền";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, run };
}


export function useCheckoutRefund() {
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
    const [doneSet, setDoneSet]       = useState<Set<string>>(new Set());

    const checkout = useCallback(async (refundId: string): Promise<string | null> => {
        setLoadingMap(prev => ({ ...prev, [refundId]: true }));
        try {
            const url = await refundApi.checkoutRefund(refundId);
            if (url) {
                window.location.href = url;
                return url;
            }
            setDoneSet(prev => new Set([...prev, refundId]));
            return null;
        } finally {
            setLoadingMap(prev => ({ ...prev, [refundId]: false }));
        }
    }, []);

    const checkoutAll = useCallback(async (refunds: RefundItem[]) => {
        const pending = refunds.filter(r => !doneSet.has(r.refundId));
        for (const r of pending) {
            try { await checkout(r.refundId); } catch {}
        }
    }, [doneSet, checkout]);

    const isLoading = (id: string) => !!loadingMap[id];
    const isDone    = (id: string) => doneSet.has(id);
    const pendingCount = (refunds: RefundItem[]) =>
        refunds.filter(r => !doneSet.has(r.refundId)).length;

    return { checkout, checkoutAll, isLoading, isDone, pendingCount };
}