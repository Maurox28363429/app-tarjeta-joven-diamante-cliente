import { instance } from ".";

export default async function getUniversities({
  page = 1,
  search = "",
  dir,
} = {}) {
  const { data } = await instance.get(
    `/universidades?nombre=${search}&page=${page}&dir=${dir}`
  );
  return data;
}
