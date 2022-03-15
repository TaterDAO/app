// Constants
import { ContractIds } from "@constants/Contracts";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import { useState, useEffect } from "react";

// Types
import type Web3 from "web3";
import type { Args } from "@T/Contract";

// Libs
import ContractAPI from "@libs/ContractAPI";

type MethodsMap = { [method: string]: Args };

const ContractForm: React.FC<{ contractId: ContractIds }> = ({
  contractId
}) => {
  //$ Hooks
  const web3 = useWeb3();

  //$ State
  const [api, setAPI] = useState<ContractAPI>();
  const [methods, setMethods] = useState<MethodsMap>({});

  //$ Effects

  useEffect(() => {
    // Wait until wallet is connected.
    if (!web3.wallet.connected) return;

    setAPI(
      new ContractAPI(
        web3.web3API as Web3,
        contractId,
        "",
        web3.wallet.address as string
      )
    );
  }, [web3.web3API, web3.wallet.connected, web3.wallet.address]);

  useEffect(() => {
    // Wait for API to load
    if (!api) return;

    // Parse setters
    const setters: MethodsMap = {};
    Object.keys(api.methods).forEach((method) => {
      const { args } = api.getMethodSignature(method);
      // Ignore getters
      if (args.length === 0) return;
      setters[method] = args;
    });
    setMethods(setters);
  }, [api]);

  //$ Handlers

  const handleChange = (methodName: string, argName: string, value: string) => {
    console.log({ methodName, argName, value });

    // TODO: Validate param.
    // TODO: Save to state.
  };

  //$ Render

  const getInput = (
    methodName: string,
    arg: { name: string; type: string }
  ) => {
    switch (arg.type) {
      case "string": {
        return (
          <input
            type="text"
            placeholder={arg.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(methodName, arg.name, event.target.value)
            }
          />
        );
      }
      default: {
        return <input />;
      }
    }
  };

  return (
    <div>
      <h3>{contractId}.sol</h3>
      {Object.entries(methods).map(([methodName, args]) => (
        <div key={`${contractId}-${methodName}`}>
          <h4>{methodName}</h4>
          {args.map((arg) => (
            <div key={`${contractId}-${methodName}-${arg.name}`}>
              <label>
                {arg.name} ({arg.type})
              </label>
              <div>{getInput(methodName, arg)}</div>
            </div>
          ))}
          <br />
          <button>Send</button>
        </div>
      ))}
    </div>
  );
};

export default ContractForm;
