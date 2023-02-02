// Types
import type { NextPage } from "next";

// Components
import MultiStepMintForm from "@components/forms/mint/MultiStepMintForm";

// Hooks
import { useEffect } from "react";
import { useRouter } from "next/router";

// Utils
import { transactionsDisabled } from "@utils/flags";

const MintPage: NextPage = ({}) => {
  const router = useRouter();

  useEffect(() => {
    if (transactionsDisabled()) router.push("/");
  }, []);

  return <MultiStepMintForm />;
};

export default MintPage;
