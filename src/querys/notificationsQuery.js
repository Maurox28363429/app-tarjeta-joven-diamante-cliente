import { useQuery } from '@tanstack/vue-query';
import getNotifications from 'src/api/getNotifications';

export const useGetNotificationsQuery = ({ id, page = {} }) => {
  return useQuery(['notification', page], async () =>
    getNotifications({ page: page.value.current, id })
  );
};
