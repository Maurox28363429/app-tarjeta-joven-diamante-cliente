import { instance } from '.'

export default async function getOffersForUniversitys ({
  page = 1,
  search = '',
  dir,
  id
} = {}) {
  const { data } = await instance.get(
    `/universidades?with[]=comercio&nombre=${search}&page=${page}&dir=${dir}&universidad_id=${id}`
  )
  return data
}
