const convertToFile = (imageData) => {
  const byteString = atob(imageData.split(',')[1])
  const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ab], { type: mimeString })
  const file = new File([blob], 'image.jpg', { type: mimeString })
  return file
}

const openCamera = (onPhotoDataSuccess, onFail) => {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
    quality: 20,
    allowEdit: false,
    destinationType: navigator.camera.DestinationType.DATA_URL
  })
}

export { convertToFile, openCamera }
