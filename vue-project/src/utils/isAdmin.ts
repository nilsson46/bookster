import { getUserRole } from '@/components/TokenItem.vue';

export const isAdmin = (): boolean => {
  const userRole = getUserRole();
  return userRole === "ADMIN";
};