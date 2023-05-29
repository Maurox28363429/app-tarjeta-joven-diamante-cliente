export const convertToFormdata = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      return formData.append(key, JSON.stringify(value));
    }
    return formData.append(key, value);
  });

  return formData;
};
