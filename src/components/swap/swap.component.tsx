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
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";

import "./style.css";
import "../../assets/styles/styles.css";
import {
    Apple,
    Potato,
    Tomato,
    LSR,
    ISmartContract,
} from "../../smart-contracts/smart-contract-data";
import React from "react";

export const SwapComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [tokenA, setTokenA] = useState<ISmartContract>(Apple);
    const [tokenB, setTokenB] = useState<ISmartContract>(Potato);
    const [amountA, setAmountA] = useState<number>(5000);
    const clickSwap = async () => {
        await smartContractService.swap(
            tokenA,
            tokenB,
            BigInt(amountA),
            BigInt(amountA)
        );
    };

    return (
        <Card className="SwapComponent">
            <CardHeader title="Swap"></CardHeader>
            <CardContent>
                <div className="select-text-wrapper">
                    <div className="item-wrapper-left">
                        <FormControl variant="filled">
                            <InputLabel id="select-tokenA-to-addLiq-label">
                                Token A
                            </InputLabel>
                            <Select
                                value={tokenA}
                                labelId="select-tokenA-to-addLiq-label"
                                id="select-token-to-mint"
                                onChange={(event) => {
                                    setTokenA(
                                        event.target.value as ISmartContract
                                    );
                                    console.log(tokenA.nameLong);
                                }}
                            >
                                {tokenContracts.map((tkn) => (
                                    //@ts-ignore - necessary to load object into value
                                    <MenuItem value={tkn} key={tkn.nameShort}>
                                        {tkn.nameShort}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="item-wrapper-right">
                        <TextField
                            className="item-wrapper"
                            id="outlined-basic"
                            label="Amount"
                            variant="filled"
                            value={amountA}
                            onChange={(event) => {
                                setAmountA(Number(event.target.value));
                            }}
                        />
                    </div>
                </div>

                <div className="select-text-wrapper">
                    <div className="item-wrapper-left">
                        <FormControl
                            variant="filled"
                            className="item-wrapper"
                            sx={{ width: 188 }}
                        >
                            <InputLabel id="select-token-to-mint-label">
                                Token B
                            </InputLabel>
                            <Select
                                value={tokenB}
                                labelId="select-tokenA-to-addLiq-label"
                                id="select-token-to-mint"
                                onChange={(event) => {
                                    setTokenB(
                                        event.target.value as ISmartContract
                                    );
                                    console.log(tokenA.nameLong);
                                }}
                            >
                                {tokenContracts.map((tkn) => (
                                    //@ts-ignore - necessary to load object into value
                                    <MenuItem value={tkn} key={tkn.nameShort}>
                                        {tkn.nameShort}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <Button variant="contained" color="success" onClick={clickSwap}>
                    Swap
                </Button>
            </CardContent>
        </Card>
    );
};
