export const checkFileType = (acceptedTypes) => {
  return (files) => {
    return files.filter((file) => acceptedTypes.includes(file.type));
  };
};
