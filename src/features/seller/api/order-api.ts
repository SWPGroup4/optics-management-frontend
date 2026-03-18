import { api } from '@/lib/axios';

/* ====== TYPE ====== */
export interface Order {
  orderId: string;
  customerId: string;
  phoneNumber: string;
  deliveryAddress: string;
  orderStatus: 'AWAITING_VERIFICATION';
  totalAmount: number;
  depositAmount: number;
  items: OrderItem[];
}
export interface Prescription {
  id: string;
  imageUrl: string | null;
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
}
export interface OrderItem {
  orderItemId: string;
  productVariantId: string;
  orderItemType: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  prescription?: Prescription;
}

export const orderApi = {
  getAwaitingVerificationOrders: async (): Promise<Order[]> => {
    const response = await api.get('management/orders?status=AWAITING_VERIFICATION');

    return response.data.result;
  },
  getOrderDetail: async (orderId: string): Promise<Order> => {
    const res = await api.get(`/management/orders/${orderId}`);
    return res.data.result;
  },
  verifyOrder: async (orderId: string, isApproved: boolean): Promise<void> => {
    await api.put(`/sales/orders/${orderId}/verify?isApproved=${isApproved}`);
  },
};
