/**
 * Reads the dimensions of a Javascript File representing an image.
 * @param image File
 * @returns
 */
async function getImageDimensionsFromFile(
  image: File
): Promise<{ height: number; width: number }> {
  const img = document.createElement("img");
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve({ height: img.naturalHeight, width: img.naturalWidth });
    };
    img.src = URL.createObjectURL(image);
  });
}

export { getImageDimensionsFromFile };
