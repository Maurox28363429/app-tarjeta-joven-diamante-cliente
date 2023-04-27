export async function urlToBinary({ url, fileName }) {
  try {
    // Hacer una solicitud a la URL de la imagen
    const response = await fetch(url, {
      "Access-Control-Allow-Origin": "*",
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error al obtener la imagen: ${response.statusText}`);
    }

    // Convertir la imagen a Blob (binario)
    const blob = await response.blob();

    const file = new File([blob], fileName, {
      type: blob.type,
      lastModified: Date.now(),
    });

    // Opcionalmente, si quieres convertir la imagen a ArrayBuffer (binario)
    // const arrayBuffer = await response.arrayBuffer();

    return file; // Retorna el objeto Blob (binario)
    // return arrayBuffer; // Retorna el objeto ArrayBuffer (binario), si lo prefieres
  } catch (error) {
    console.error("Error al convertir la URL de la imagen a binario:", error);
  }
}
