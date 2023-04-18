import { instance } from ".";

export default async function createPayment({
  user_id,
  payment,
  referencia,
  membresia_id,
  img,
}) {
  const formData = new FormData();
  formData.append("payment", payment);
  formData.append("user_id", user_id);
  formData.append("referencia", referencia);
  formData.append("membresia_id", membresia_id);
  formData.append("img", img);

  return await instance.post("/payment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
