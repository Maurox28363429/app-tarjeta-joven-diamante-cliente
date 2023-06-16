import { instance } from '.';

export default async function getHelpNumber() {
  const { data } = await instance.get('/sos');
  return data;
}
