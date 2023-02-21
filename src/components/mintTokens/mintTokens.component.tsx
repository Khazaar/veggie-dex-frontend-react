import { useContext, useEffect, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";

import "./style.css";
import { tokenAsset } from "../../interfaces/tokenAssets.interface";
import { HeaderComponent } from "../../layouts/header/header.component";
import {
    Apple,
    Potato,
    Tomato,
    LSR,
    ISmartContract,
} from "../../smart-contracts/smart-contract-data";
import React from "react";

export const MintTokensComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [tokenToMint, settokenToMint] = React.useState<ISmartContract>();
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 100,
                width: 250,
            },
        },
    };

    const handleChange = (event: SelectChangeEvent<ISmartContract>) => {
        const {
            target: { value },
        } = event;
        settokenToMint(value as ISmartContract);
        console.log(value);
    };

    return (
        <div className="user-assets">
            <Card>
                <CardHeader title="Mint Tokens"></CardHeader>
                <CardContent>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="select-token-to-mint-label">
                            Token
                        </InputLabel>
                        <Select
                            labelId="select-token-to-mint-label"
                            id="select-token-to-mint"
                            onChange={handleChange}
                            MenuProps={MenuProps}
                            input={<OutlinedInput label="Name" />}
                        >
                            {tokenContracts.map((name) => (
                                <MenuItem
                                    value={name.nameShort}
                                    key={name.nameShort}
                                >
                                    {name.nameShort}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    );
};
