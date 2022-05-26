import { useEffect, useState } from "react";
import * as ipfs from "@services/IPFS";
import { csr } from "@utils/browser";

function useIPFSImage(uri: string): {
  loading: boolean;
  data: string;
  valid: boolean;
} {
  const isClient = csr();

  const valid = uri.startsWith("ipfs");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, set] = useState<string>("");

  useEffect(() => {
    async function loadImage() {
      setLoading(true);
      const res = await ipfs.fetchImage(uri);
      set(res); // update state
      setLoading(false);
    }
    if (valid && isClient) loadImage();
  }, [valid, uri, isClient]);

  return { loading, data, valid };
}

export default useIPFSImage;
