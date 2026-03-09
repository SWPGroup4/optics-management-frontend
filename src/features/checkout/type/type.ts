export interface CheckoutItemPayload {
  productVariantId: string;
  lensId: string | null;
  quantity: number;
}

export interface CheckoutRequest {
  items: CheckoutItemPayload[];
}

export interface ItemRequirement {
  orderItemId: string;
  orderItemType: 'IN_STOCK' | 'PRE_ORDER';
  quantity: number;
  unitPrice: number;
  lensPrice: number;
  lensPriceTotal: number;
  baseItemTotal: number;
  itemTotal: number;
  paymentPercentage: number;
  requiredPayment: number;
}

export interface CheckoutResponse {
  code: number;
  message: string;
  result: {
    depositPercentage: number;
    requiredAmount: number;
    orderTotal: number;
    requiredPaymentTotal: number;
    remainingPaymentTotal: number;
    itemRequirements: ItemRequirement[];
    allowCOD: boolean;
    message: string;
  };
}
