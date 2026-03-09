// src/features/users/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user-api";

export const useUsers = (role: 'SALE' | 'CUSTOMER') => {
  return useQuery({
    queryKey: ['users', role],
    queryFn: () => userApi.getUsersByRole(role),
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.createStaff,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users', 'SALE'] }),
  });
};

export const useDeleteUser = (role: 'SALE' | 'CUSTOMER') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users', role] }),
  });
};