import { instance } from '.';

export default async function GetPaginatorOrder(
  page,
  search,
  initDate,
  endDate
) {
  const { data } = await instance.get(
    '/ordenEcommerce?with[]=cliente&search=' +
      search +
      '&page=' +
      page +
      '&initDate=' +
      initDate +
      '&endDate=' +
      endDate
  );
  return data;
}
