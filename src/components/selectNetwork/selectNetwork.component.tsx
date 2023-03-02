import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./style.css";
import { useContext, useState } from "react";
import { BSC, Goerli, Hardhat, INetwork } from "../../smart-contracts/networks";
import { SmartContractServiceContext } from "../../App";

export const SelectNetworkComponent = () => {
    const networks: INetwork[] = [Hardhat, BSC, Goerli];
    const [network, setNetwork] = useState<INetwork>(BSC);
    const smartContractService = useContext(SmartContractServiceContext);

    const handleChange = async (event: SelectChangeEvent<INetwork>) => {
        const {
            target: { value },
        } = event;
        setNetwork(value as INetwork);
        await smartContractService.connectService.setNetwork(value as INetwork);
        console.log(value);
    };

    return (
        <div className="SelectNetworkComponentStyle">
            <FormControl sx={{ width: 150 }}>
                <InputLabel id="elect-network-label1">Network</InputLabel>
                <Select
                    value={network}
                    labelId="elect-network-label1"
                    id="select-network333"
                    onChange={handleChange}
                    label="Network"
                >
                    {networks.map((name) => (
                        //@ts-ignore - necessary to load object into value
                        <MenuItem value={name} key={name.nameShort}>
                            {name.nameShort}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
