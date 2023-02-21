import { useContext, useEffect, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";

import "./style.css";
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
    const [tokenToMint, setTokenToMint] = useState<ISmartContract>(Apple);
    const [amountToMint, setAmountToMint] = useState<number>(10000);
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 100,
                width: 250,
            },
        },
    };

    const clickMint = async () => {
        if (amountToMint > 0) {
            console.log(
                `Going to mint token ${tokenToMint.nameLong} in amount: ${amountToMint}`
            );
            if (amountToMint > 1000000) {
                console.log(`Please, mint less then 1000000 tokens`);
            } else {
                await smartContractService.mintTokens(
                    tokenToMint.instance,
                    BigInt(amountToMint)
                );
            }
        }
    };

    return (
        <Card className="MintTokensComponent">
            <CardHeader title="Mint Tokens"></CardHeader>
            <CardContent>
                <div className="select-text-wrapper">
                    <FormControl className="item-wrapper">
                        <InputLabel id="select-token-to-mint-label">
                            Token
                        </InputLabel>
                        <Select
                            value={tokenToMint}
                            labelId="select-token-to-mint-label"
                            id="select-token-to-mint"
                            onChange={(event) => {
                                setTokenToMint(
                                    event.target.value as ISmartContract
                                );
                                console.log(tokenToMint.nameLong);
                            }}
                            MenuProps={MenuProps}
                        >
                            {tokenContracts.map((tkn) => (
                                //@ts-ignore - necessary to load object into value
                                <MenuItem value={tkn} key={tkn.nameShort}>
                                    {tkn.nameShort}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        className="item-wrapper"
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        value={amountToMint}
                        onChange={(event) => {
                            setAmountToMint(parseInt(event.target.value));
                        }}
                    />
                </div>

                <Button variant="contained" color="success" onClick={clickMint}>
                    Mint
                </Button>
            </CardContent>
        </Card>
    );
};
