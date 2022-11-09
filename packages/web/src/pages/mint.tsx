// Types
import type { NextPage } from "next";

// Components
import ConnectWalletForm from "@components/ConnectWalletForm";
import UnsupportedNetwork from "@components/UnsupportedNetwork";
import MultiStepMintForm from "@components/forms/mint/MultiStepMintForm";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Utils
import { transactionsDisabled } from "@utils/flags";

const MintPage: NextPage = ({}) => {
  const web3 = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (transactionsDisabled()) router.push("/");
  }, []);

  return web3.initialized && web3.wallet.connected ? (
    web3.network.supported ? (
      <MultiStepMintForm />
    ) : (
      <UnsupportedNetwork />
    )
  ) : (
    <ConnectWalletForm />
  );
};

export default MintPage;
