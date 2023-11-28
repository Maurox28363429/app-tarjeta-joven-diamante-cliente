import { useQuery } from '@tanstack/vue-query';

import getNotifications from 'src/api/getNotifications';

const NOTIFICATION_KEY = 'notification';

export const useGetNotificationsQuery = ({ id, page }) => {
  return useQuery([NOTIFICATION_KEY, page], async () =>
    getNotifications({ page: page?.value?.current, id })
  );
};
