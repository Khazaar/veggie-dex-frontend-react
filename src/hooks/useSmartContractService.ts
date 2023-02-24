import { useContext } from "react";
import { SmartContractServiceContext } from "../App";
import { SmartContractService } from "../services/smart-contract.service";

export const useSmartContractService = () => {
    const smartContractService: SmartContractService = useContext(
        SmartContractServiceContext
    );

    return smartContractService;
};
