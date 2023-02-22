import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./style.css";
import React, { useContext } from "react";
import { BSC, Goerli, Hardhat, INetwork } from "../../smart-contracts/networks";
import { SmartContractServiceContext } from "../../App";

export const SelectNetworkComponent = () => {
    const networks: INetwork[] = [Hardhat, BSC, Goerli];
    const [network, setNetwork] = React.useState<INetwork>(Hardhat);
    const smartContractService = useContext(SmartContractServiceContext);

    const handleChange = (event: SelectChangeEvent<INetwork>) => {
        const {
            target: { value },
        } = event;
        setNetwork(value as INetwork);
        smartContractService.connectService.setNetwork(value as INetwork);
        console.log(value);
    };

    return (
        <div className="">
            <FormControl variant="filled" sx={{ minWidth: 150 }}>
                <InputLabel id="select-network-label1">Network</InputLabel>
                <Select
                    labelId="select-network-label1"
                    id="select-network"
                    onChange={handleChange}
                    value={network}
                >
                    {networks.map((name) => (
                        <MenuItem value={name.nameShort} key={name.nameShort}>
                            {name.nameShort}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
