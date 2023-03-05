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
import { useNetwork } from "wagmi";

export const SelectNetworkComponent = () => {
    const networks: INetwork[] = [Hardhat, BSC, Sepolia];
    const [network, setNetwork] = useState<INetwork>(BSC);
    const smartContractService = useContext(SmartContractServiceContext);
    const { chain, chains } = useNetwork();

    const handleChange = async (event: SelectChangeEvent<INetwork>) => {
        const {
            target: { value },
        } = event;
        setNetwork(value as INetwork);
        await smartContractService.connectService.setNetwork(value as INetwork);
        await smartContractService.connectService.initConnectService();
        console.log(value);
        //console.log("chain", chain.name);
    };

    useEffect(() => {
        const init = async () => {
            await smartContractService.connectService.setNetwork(network);
            await smartContractService.connectService.initConnectService();
        };
        init();
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
                    {networks.map((name) => (
                        //@ts-ignore - necessary to load object into value
                        <MenuItem value={name} key={name.nameShort}>
                            {name.nameShort}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
