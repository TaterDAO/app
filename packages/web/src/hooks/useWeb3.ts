import { useContext } from "react";
import Context from "@contexts/Web3";

const useWeb3 = () => useContext(Context);

export default useWeb3;
