// Types
import type { Image } from "@T/Image";

// Libs
import axios from "axios";

// Types
export type FileMetadata = {
  name: string;
  hash: string;
  size: number;
  uri: string;
};

async function request(url: string, data: object | null): Promise<any> {
  return await axios.post(url, data, {
    headers: {
      Accept: "application/json",
      Authorization: process.env.INFURA_IPFS_JWT as string,
      "Content-Type": "multipart/form-data",
      "User-Agent": "TATERDAO"
    }
  });
}

export async function removeFile(hash: string): Promise<void> {
  const res = await request(
    `https://ipfs.infura.io:5001/api/v0/pin/rm?arg=${hash}`,
    null
  );
  console.log(res);
}

/**
 * Uploads a file to IPFS.
 * @see https://docs.infura.io/infura/networks/ipfs/how-to/manage-files#add-a-file
 */
export async function uploadFile(file: File): Promise<FileMetadata | never> {
  // Setup form data
  const formData = new FormData();
  formData.append("file", file);

  const {
    data: { Hash, Name, Size }
  } = await request("https://ipfs.infura.io:5001/api/v0/add", formData);

  return {
    name: Name,
    hash: Hash,
    size: parseInt(Size),
    uri: `ipfs://${Hash}`
  };
}

/**
 * Uploads an image to IPFS via Infura
 * @see https://docs.infura.io/infura/networks/ipfs/how-to/manage-files#add-a-file
 */
export async function uploadImage(image: Image): Promise<FileMetadata | never> {
  return uploadFile(image.src as File);
}

/**
 * Returns a url for a given CID in order to view files.
 * @param cid IPFS CID
 * @returns URL.
 */
export function cidToURL(cid: string): URL {
  const withoutProtocol = cid.replace("ipfs://", "");
  const url = new URL(
    `${process.env.NEXT_PUBLIC_INFURA_IPFS_API_ENDPOINT}/ipfs/${withoutProtocol}`
  );
  return url;
}
