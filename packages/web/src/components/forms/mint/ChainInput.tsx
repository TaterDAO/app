// Components
import MultiCheckboxInput from "../MultiCheckboxInput";

// Hooks
import useMintForm from "./useMintForm";
import { useEffect, useState } from "react";

// Types
import { ActionType } from "@contexts/mint/types";

// Services
import { chains } from "@services/WalletConnect";

const ChainInput: React.FC<{}> = ({}) => {
  const form = useMintForm();
  const [options, setOptions] = useState<Array<Array<string | number>>>([]);

  //? Workaround to avoid React Hydration Error caused by chains not being available
  //? during SSR.
  useEffect(() => {
    setOptions(
      chains
        .map((chain) => [chain.id, chain.name])
        .sort((a, b) => (a[1] > b[1] ? 1 : 0))
    );
  }, []);

  return options.length ? (
    <MultiCheckboxInput
      form={form}
      fieldId="chains"
      label="Mint To"
      description="Which blockchains would you like to mint on?"
      options={options}
      value={form.state.chains}
      onSelect={(value: string) =>
        form.dispatch({ type: ActionType.AddChain, value: parseInt(value) })
      }
      onDeselect={(value: string) =>
        form.dispatch({ type: ActionType.RemoveChain, value: parseInt(value) })
      }
    />
  ) : (
    <></>
  );
};

export default ChainInput;
