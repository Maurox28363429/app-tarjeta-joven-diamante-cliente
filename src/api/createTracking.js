import { instance } from '.';

export default async function createOcreateTrackingffer(user_id, comercio_id) {
  return await instance.post('/tracking', {
    user_id,
    comercio_id,
  });
}
