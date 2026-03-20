import { api } from '@/lib/axios';

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
    productVariantId: string | null;
    itemName: string | null;
    productName: string | null;
    productImage: string | null;
    variantName: string | null;
    orderItemType: 'IN_STOCK' | 'PRE_ORDER' | 'PREORDER';
    quantity: number;
    unitPrice: number;
    lensId: string | null;
    lensName: string | null;
    lensPrice: number;
    lensPriceTotal: number;
    totalPrice: number;
    status: 'IN_PRODUCTION' | 'COMPLETED' | 'PENDING' | string | null;
    prescription: Prescription | null;
}

export interface Payment {
    id: string;
    paymentMethod: string;
    paymentPurpose: string;
    amount: number;
    percentage: number | null;
    status: string;
    paymentDate: string | null;
    description: string | null;
    transactionReference: string | null;
}

export interface ShipperInfo {
    id: string;
    fullName: string | null;
    phone: string | null;
    email: string | null;
    imageUrl: string | null;
}

export interface BankInfo {
    bankName: string | null;
    bankAccountNumber: string | null;
    accountHolderName: string | null;
}

export interface Order {
    customerId: string;
    orderId: string;
    orderName: string | null;
    deliveryAddress: string;
    recipientName: string | null;
    phoneNumber: string;
    orderStatus:
    | 'PENDING'
    | 'ON_HOLD'
    | 'CONFIRMED'
    | 'PROCESSING'
    | 'PRODUCED'
    | 'SHIPPED'
    | 'COMPLETED'
    | 'CANCELLED';
    totalAmount: number;
    depositAmount: number;
    remainingAmount: number | null;
    paidAmount: number;
    items: OrderItem[];
    payments: Payment[];
    shipperInfo: ShipperInfo | null;
    comboId: string | null;
    comboName: string | null;
    comboDiscountAmount: number | null;
    comboSnapshot: string | null;
    refundedAmount: number;
    finalTotalAfterRefund: number;
    bankInfo: BankInfo;
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