export type OrderStatus = 'waiting_cutting' | 'waiting_packaging' | 'shipping' | 'completed';
export type PaymentStatus = 'deposit_50' | 'full_payment' | 'unpaid';
export type PriorityLevel = 'high' | 'medium' | 'low';

export interface KPIData {
    id: string;
    title: string;
    value: number;
    unit: string;
    percentage: number;
    variant: 'neutral' | 'critical' | 'success';
    icon: string;
    description?: string;
}

export interface Order {
    id: string;
    orderCode: string;
    customerName: string;
    sla: string;
    slaHours: number;
    priority: PriorityLevel;
    productName: string;
    productType: string;
    productFeatures: string;
    productIcon: string;
    paymentStatus: PaymentStatus;
    status: OrderStatus;
    isActionable: boolean;
}

export interface TabItem {
    id: string;
    label: string;
    count?: number;
    isActive: boolean;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    startIndex: number;
    endIndex: number;
}

export interface PickingItem {
    id: string;
    type: 'frame' | 'lens';
    name: string;
    sku: string;
    quantity: number;
    location: string;
    locationType: 'shelf' | 'cabinet';
    imageUrl?: string;
}

export interface Prescription {
    od: {
        sphere: number;
        cylinder: number;
        axis: number;
        pd: number;
    };
    os: {
        sphere: number;
        cylinder: number;
        axis: number;
        pd: number;
    };
}

export interface SalesNote {
    id: string;
    type: 'warning' | 'info' | 'success';
    title: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
}

export interface OrderDetail extends Order {
    receivedTime: string;
    pickingItems: PickingItem[];
    prescription: Prescription;
    salesNotes: SalesNote[];
    processingStatus: 'pending' | 'in_progress' | 'completed' | 'error';
}

export interface DrawerState {
    isOpen: boolean;
    selectedOrder: OrderDetail | null;
}