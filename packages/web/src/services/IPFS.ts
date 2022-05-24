// Types
import type { Image } from "@T/Image";

// Libs
import axios from "axios";
import { create } from "ipfs-http-client";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_INFURA_IPFS_API_ENDPOINT}/api/v0/`,
  headers: {
    Authorization: process.env.INFURA_IPFS_JWT as string
  }
});

const ipfs = create({
  url: `${process.env.NEXT_PUBLIC_INFURA_IPFS_API_ENDPOINT}/api/v0/`,
  headers: {
    Authorization: process.env.INFURA_IPFS_JWT as string
  }
});

async function uploadImage(
  image: Image
): Promise<{ name: string; hash: string; size: number; uri: string } | never> {
  const file = image.src as File;
  const data = new FormData();
  data.append("file", file);

  const res = await api.post("add", data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    },
    params: { pin: true }
  });

  const hash = res.data.Hash;

  return {
    name: res.data.Name,
    hash,
    size: parseInt(res.data.Size),
    uri: `ipfs://${hash}`
  };
}

async function fetchImage(uri: string): Promise<string> {
  const hash = uri.replace("ipfs://", "");

  return new Promise(async (resolve, reject) => {
    const { data } = await api.post(
      "cat",
      {},
      { params: { arg: hash }, responseType: "blob" }
    );

    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
}

export { uploadImage, fetchImage };
