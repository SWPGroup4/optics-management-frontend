import { useState, useEffect, useCallback } from 'react';
import { orderApi, type Order } from '@/features/manager/api/order-api';

export type { Order };

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderApi.getOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.message ?? 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
}
