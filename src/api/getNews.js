import { instance } from '.'

export default async function getNews ({ page = 1, search = '' } = {}) {
  return await instance.get(`/noticias?search=${search}&page=${page}`)
}
