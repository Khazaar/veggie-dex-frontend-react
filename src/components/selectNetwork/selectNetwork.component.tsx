import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";

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
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";

export const SelectNetworkComponent = () => {
    const networks: { [name: string]: INetwork } = {
        ["Binance Smart Chain Testnet"]: BSC,
        ["Sepolia"]: Sepolia,
        ["Hardhat"]: Hardhat,
    };
    const [network, setNetwork] = useState<INetwork>(BSC);
    const smartContractService = useContext(SmartContractServiceContext);
    const { chain } = useNetwork();
    const { connector: activeConnector, isConnected } = useAccount();
    const { switchNetwork } = useSwitchNetwork();

    const handleChange = async (event: SelectChangeEvent<INetwork>) => {
        const {
            target: { value },
        } = event;
        setNetwork(value as INetwork);
        await smartContractService.connectService.setNetwork(value as INetwork);
        await smartContractService.connectService.initConnectService(
            await activeConnector.getSigner()
        );
        console.log(value);
        switchNetwork((value as INetwork).id);
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
                await activeConnector.getSigner()
            );
        };
        isConnected && activeConnector && init();
    }, [activeConnector, isConnected]);

    return (
        <Box sx={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
            <FormControl
                sx={{
                    width: { xs: 120, sm: 130, md: 130, lg: 130 },
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
