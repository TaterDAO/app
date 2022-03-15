// Types
import type { NextPage } from "next";

// Components
import Wallets from "@components/Wallets";
import ContractForm from "@components/ContractForm";

// Constants
import { ContractIds } from "@constants/Contracts";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Wallets />
      <ContractForm contractId={ContractIds.TitleV1_0} />
    </div>
  );
};

export default Home;
