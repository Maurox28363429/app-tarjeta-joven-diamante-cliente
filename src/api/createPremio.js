import { instance } from '.';

export default async function createPremio(formData) {
  return await instance.post('/concurso', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
