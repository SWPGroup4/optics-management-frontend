import { api } from "@/lib/axios";

/* ====== TYPE ====== */
export interface Order {
  orderId: string;
  customerId: string;
  phoneNumber: string;
  deliveryAddress: string;
  orderStatus: "AWAITING_VERIFICATION";
  totalAmount: number;
  depositAmount: number;
}


export const orderApi = {
 
  getAwaitingVerificationOrders: async (): Promise<Order[]> => {
    const response = await api.get(
      "management/orders?status=AWAITING_VERIFICATION"
    );

    
    return response.data.result;
  },
};