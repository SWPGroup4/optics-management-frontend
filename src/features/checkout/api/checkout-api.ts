import { api } from "@/lib/axios";
import type { CheckoutRequest, CheckoutResponse } from "../type/type";

export const paymentApi = {
  getPaymentRequirement: async (payload: CheckoutRequest) =>
    await api
      .post<CheckoutResponse>('/payment/orders/requirement', payload)     
      .then((res) => res.data),
};
