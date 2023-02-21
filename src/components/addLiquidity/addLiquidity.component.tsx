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

export const AddLiquidityComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [tokenA, setTokenA] = useState<ISmartContract>(Apple);
    const [tokenB, setTokenB] = useState<ISmartContract>(Potato);
    const [amountA, setAmountA] = useState<number>(5000);
    const [amountB, setAmountB] = useState<number>(5000);

    const clickAddLiquidity = async () => {};

    return (
        <Card className="AddLiquidityComponent">
            <CardHeader title="Add Liquidity"></CardHeader>
            <CardContent>
                <div className="select-text-wrapper">
                    <FormControl className="item-wrapper">
                        <InputLabel id="select-token-to-mint-label">
                            Token A
                        </InputLabel>
                        <Select
                            value={tokenA}
                            labelId="select-tokenA-to-addLiq-label"
                            id="select-token-to-mint"
                            onChange={(event) => {
                                setTokenA(event.target.value as ISmartContract);
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
                    <TextField
                        className="item-wrapper"
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        value={amountA}
                        onChange={(event) => {
                            setAmountA(parseInt(event.target.value));
                        }}
                    />
                </div>

                <div className="select-text-wrapper">
                    <FormControl className="item-wrapper">
                        <InputLabel id="select-token-to-mint-label">
                            Token B
                        </InputLabel>
                        <Select
                            value={tokenB}
                            labelId="select-tokenA-to-addLiq-label"
                            id="select-token-to-mint"
                            onChange={(event) => {
                                setTokenB(event.target.value as ISmartContract);
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
                    <TextField
                        className="item-wrapper"
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        value={amountB}
                        onChange={(event) => {
                            setAmountB(parseInt(event.target.value));
                        }}
                    />
                </div>

                <Button
                    variant="contained"
                    color="success"
                    onClick={clickAddLiquidity}
                >
                    Add Liquidity
                </Button>
            </CardContent>
        </Card>
    );
};
