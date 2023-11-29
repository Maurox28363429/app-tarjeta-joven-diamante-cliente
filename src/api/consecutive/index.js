import { instance } from '..';

const CONSECUTIVE_PATH = '/consecutivos';

async function getConsecutivo() {
  const { data } = await instance.get(
    `${CONSECUTIVE_PATH}?search=Consecutivo_seguro`
  );
  return data;
}

async function uploadConsecutive(consecutive) {
  const { data } = await instance.post(
    `${CONSECUTIVE_PATH}/${consecutive.id}`,
    consecutive
  );
  return data;
}

export { getConsecutivo, uploadConsecutive };
