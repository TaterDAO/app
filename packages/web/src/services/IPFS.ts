// Types
import type { Image } from "@T/Image";

// Libs
import axios from "axios";

/**
 * Uploads an image to IPFS via Infura
 * @see https://docs.infura.io/infura/networks/ipfs/how-to/manage-files#add-a-file
 */
async function uploadImage(
  image: Image
): Promise<{ name: string; hash: string; size: number; uri: string } | never> {
  // Load form data
  const formData = new FormData();
  formData.append("file", image.src as File);

  const {
    data: { Hash, Name, Size }
  } = await axios.post("https://ipfs.infura.io:5001/api/v0/add", formData, {
    headers: {
      Accept: "application/json",
      Authorization: process.env.INFURA_IPFS_JWT as string,
      "Content-Type": "multipart/form-data",
      "User-Agent": "TATERDAO"
    }
  });

  return {
    name: Name,
    hash: Hash,
    size: parseInt(Size),
    uri: `ipfs://${Hash}`
  };
}

export { uploadImage };
