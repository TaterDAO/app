import { cidToURL } from "@services/IPFS";

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

/**
 * Gets image src for a Title.
 * @param src {string | undefined} A given src will either be undefined, if no image was
 * provided with the Title, or a URI to that image.  The URI may either be IPFS protocol
 * or HTTP (legacy).
 * @returns
 */
function getImageSrc(src: string | undefined): string {
  if (!src) return "/images/placeholder.jpeg";
  if (src.startsWith("ipfs://")) {
    return cidToURL(src).href;
  } else {
    return src;
  }
}

export { getImageDimensionsFromFile, getImageSrc };
