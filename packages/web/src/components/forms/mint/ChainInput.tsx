// Components
import MultiCheckboxInput from "../MultiCheckboxInput";

// Hooks
import useMintForm from "./useMintForm";

// Types
import { Chain } from "@contexts/mint/types";
import { ActionType } from "@contexts/mint/types";

const NameInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <MultiCheckboxInput
      form={form}
      fieldId="chains"
      label="Mint To"
      description="Which blockchains would you like to mint on?"
      options={[
        [Chain.EthereumMainnet, "Ethereum"],
        [Chain.EthereumGoerli, "Ethereum Goerli (Testnet)"],
        [Chain.ArbitrumMainnet, "Arbitrum"],
        [Chain.ArbitrumGoerli, "Arbitrum Goerli (Testnet)"],
        [Chain.PolygonMainnet, "Polygon"],
        [Chain.PolygonMumbai, "Polygon Mumbai (Testnet)"]
      ]}
      value={form.state.chains}
      onSelect={(value: string) =>
        form.dispatch({ type: ActionType.AddChain, value })
      }
      onDeselect={(value: string) =>
        form.dispatch({ type: ActionType.RemoveChain, value })
      }
    />
  );
};

export default NameInput;
