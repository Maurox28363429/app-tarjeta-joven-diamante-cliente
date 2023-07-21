import { instance } from '.';

export default async function editarPremio(id, formData) {
  return await instance.post(`/concurso/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
