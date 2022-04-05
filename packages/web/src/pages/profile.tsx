// Types
import type { NextPage } from "next";
import { IndexedFields } from "@T/Search";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Components
import Search from "@components/search";

const ProfilePage: NextPage = ({}) => {
  const web3 = useWeb3();
  const router = useRouter();

  /**
   * Ensure that the user is logged in.
   */
  useEffect(() => {
    if (web3.initialized && !web3.wallet.connected) {
      router.push("/");
    }
  }, [web3.initialized, web3.wallet.connected]);

  return web3.initialized && web3.wallet.connected ? (
    <div>
      <h1>My Titles</h1>
      <br />
      <div>
        <h4>{web3.wallet.address}</h4>
      </div>
      <br />
      <p>Titles still minting will appear momentarily...</p>
      <Search
        state={{
          refinementList: {
            [IndexedFields.Owner]: [
              web3.wallet.address?.toLowerCase() as string
            ]
          }
        }}
      />
    </div>
  ) : (
    <></>
  );
};

export default ProfilePage;
