import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./style.css";
import React from "react";
import { BSC, Goerli, Hardhat, INetwork } from "../../smart-contracts/networks";

export const SelectNetworkComponent = () => {
    const networks: INetwork[] = [Hardhat, BSC, Goerli];
    const [network, setNetwork] = React.useState<INetwork>();
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 100,
                width: 250,
            },
        },
    };

    const handleChange = (event: SelectChangeEvent<typeof network>) => {
        const {
            target: { value },
        } = event;
        setNetwork(value as INetwork);
        console.log(value);
    };

    return (
        <div className="">
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Network</InputLabel>
                <Select
                    labelId="select-network-label"
                    id="select-network"
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
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
