import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./style.css";
import { useContext, useEffect, useState } from "react";
import {
    BSC,
    Hardhat,
    INetwork,
    Sepolia,
} from "../../smart-contracts/networks";
import { SmartContractServiceContext } from "../../App";
import { useAccount, useNetwork, useSigner } from "wagmi";

export const SelectNetworkComponent = () => {
    const networks: { [name: string]: INetwork } = {
        ["Binance Smart Chain Testnet"]: BSC,
        ["Sepolia"]: Sepolia,
        ["Hardhat"]: Hardhat,
    };
    const [network, setNetwork] = useState<INetwork>(BSC);
    const smartContractService = useContext(SmartContractServiceContext);
    const { chain, chains } = useNetwork();
    const { data: signer, isError, isLoading } = useSigner();
    const { connector: activeConnector, isConnected, address } = useAccount();

    const handleChange = async (event: SelectChangeEvent<INetwork>) => {
        const {
            target: { value },
        } = event;
        setNetwork(value as INetwork);
        await smartContractService.connectService.setNetwork(value as INetwork);
        await smartContractService.connectService.initConnectService(signer);
        console.log(value);
        //console.log("chain", chain.name);
    };

    useEffect(() => {
        const init = async () => {
            console.log("Connected to chain ", chain.name);
            setNetwork(networks[chain.name]);
            await smartContractService.connectService.setNetwork(
                networks[chain.name]
            );
            await smartContractService.connectService.initConnectService(
                signer
            );
        };
        isConnected && init();
    });

    return (
        <Box sx={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
            <FormControl
                sx={{
                    width: { xs: 100, sm: 150, md: 150, lg: 150 },
                }}
            >
                <InputLabel id="elect-network-label1">Network</InputLabel>
                <Select
                    value={network}
                    labelId="elect-network-label1"
                    id="select-network333"
                    onChange={handleChange}
                    label="Network"
                    sx={{
                        height: { xs: 35, sm: 40, md: 50, lg: 50 },
                    }}
                >
                    {Object.entries(networks).map(([key, value]) => (
                        //@ts-ignore - necessary to load object into value
                        <MenuItem value={value} key={value.nameShort}>
                            {value.nameShort}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
