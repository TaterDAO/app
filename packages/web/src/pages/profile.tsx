// Types
import type { NextPage } from "next";
import { IndexedFields } from "@libs/search/types";

// Components
import { InstantSearch } from "react-instantsearch-dom";
import Hits from "@components/search/Hits";

// Services
import algolia from "@services/Algolia";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
      <p>Titles still minting will appear momentarily...</p>
      <InstantSearch
        searchClient={algolia}
        indexName={`titles-${web3.network.name}`}
        searchState={{
          refinementList: {
            [IndexedFields.Owner]: web3.wallet.address?.toLowerCase()
          }
        }}
      >
        <Hits />
      </InstantSearch>
      {/* <Search
        initFilters={
          {
            [IndexedFields.Owner]: [web3.wallet.address?.toLowerCase()]
          } as Filters
        }
        showQueryInput={false}
        showFilters={false}
      /> */}
    </div>
  ) : (
    <></>
  );
};

export default ProfilePage;
