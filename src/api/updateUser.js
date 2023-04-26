import { instance } from ".";

export default async function updateUser(id, data) {
  return await instance.post(`user/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
