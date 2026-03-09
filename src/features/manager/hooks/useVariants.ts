// src/features/products/hooks/useVariants.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { variantApi } from "../api/variant-api";

const QUERY_KEYS = {
  list: (productId: string) => ["variants", productId] as const,
};

export const useVariants = (productId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.list(productId),
    queryFn: async () => {
      const data = await variantApi.getAll(productId);
      console.log("useVariants raw response:", data);
      return (data.result || []) as any[];
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateVariant = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => variantApi.create(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.list(productId) });
    },
    onError: (error) => console.error("Failed to create variant:", error),
  });
};

export const useUpdateVariant = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ variantId, payload }: { variantId: string; payload: any }) =>
      variantApi.update(productId, variantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.list(productId) });
    },
    onError: (error) => console.error("Failed to update variant:", error),
  });
};

export const useDeleteVariant = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variantId: string) => variantApi.delete(productId, variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.list(productId) });
    },
    onError: (error) => console.error("Failed to delete variant:", error),
  });
};