import { instance } from ".";

export default async function getTransactionsClient({ page, id }) {
  return await instance.get(
    `/cliente-comercio-ofertas?with[]=comercio&with[]=client&page=${page}&client_id=${id}`
  );
}
