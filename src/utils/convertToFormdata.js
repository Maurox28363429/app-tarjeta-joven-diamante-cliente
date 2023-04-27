export const convertToFormdata = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    return formData.append(key, value);
  });

  return formData;
};
