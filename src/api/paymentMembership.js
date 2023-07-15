import { instance } from '.';

export default async function paymentMembership(paymentInfo) {
  const { data } = await instance.post('/payment-membresia', paymentInfo);

  return data;
}
