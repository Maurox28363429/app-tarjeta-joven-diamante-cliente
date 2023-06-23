import { instance } from '.';

export default async function getOffers({ page = 1, search = '', dir } = {}) {
  const { data } = await instance.get(
    `/comercio-ofertas?with[]=comercio&nombre=${search}&page=${page}${
      dir ? `&dir=${dir}` : ''
    }`
  );

  const newData = data?.data?.map((element) => {
    let linkMap = element.link_map;
    let img = element.img_array_url;

    if (typeof linkMap === 'string' && linkMap !== 'undefined') {
      try {
        linkMap = JSON.parse(linkMap);
      } catch (error) {
        console.error(
          `Error parsing link_map for element with ID ${element.id}:`,
          error
        );
      }
    }

    if (typeof img === 'string') {
      try {
        img = JSON.parse(img);
      } catch (error) {
        console.error(
          `Error parsing link_map for element with ID ${element.id}:`,
          error
        );
      }
    }

    if (
      typeof img === 'string' &&
      typeof linkMap === 'string' &&
      linkMap !== 'undefined'
    ) {
      try {
        img = JSON.parse(img);
        linkMap = JSON.parse(linkMap);
      } catch (error) {
        console.error(
          `Error parsing link_map for element with ID ${element.id}:`,
          error
        );
      }
    }

    if (linkMap === 'undefined') {
      try {
        linkMap = [];
      } catch (error) {
        console.error(
          `Error parsing link_map for element with ID ${element.id}:`,
          error
        );
      }
    }
    return {
      ...element,
      link_map: linkMap,
      img_array_url: img,
    };
  });

  return {
    data: newData,
    pagination: data.pagination,
  };
}
