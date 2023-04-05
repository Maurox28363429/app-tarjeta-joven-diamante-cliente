import { instance } from '.'

export default async function getNews () {
  return await instance.get('/noticias')
}
