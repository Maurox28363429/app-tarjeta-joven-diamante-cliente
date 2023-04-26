import { instance } from ".";

export default async function updateUser({ id, data }) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  return await instance.post(`user/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
