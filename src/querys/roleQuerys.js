import getRoles from 'src/api/getRoles';
import { useQuery } from '@tanstack/vue-query';

export const useGetRoles = () => {
  return useQuery(['role'], getRoles);
};
