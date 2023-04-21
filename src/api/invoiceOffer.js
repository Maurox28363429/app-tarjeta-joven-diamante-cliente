import { instance } from ".";

export default async function invoiceOffer({
  comercio_id,
  total_descuento,
  ofertas,
  total,
  client_id,
}) {
  const { data } = await instance.post("/cliente-comercio-ofertas", {
    comercio_id,
    total_descuento,
    ofertas,
    total,
    client_id,
  });
  return data;
}
