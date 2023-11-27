import { useQuery } from '@tanstack/vue-query';

import getAppVersion from 'src/api/getAppVersion';

export const useGetAppVersion = () => {
  return useQuery(['appVersion'], getAppVersion);
};
