import { instance } from ".";

export default async function getTransationBusiness({ page, id }) {
  return await instance.get(
    `/cliente-comercio-ofertas?with[]=comercio&with[]=client&page=${page}&comercio_id=${id}`
  );
}
