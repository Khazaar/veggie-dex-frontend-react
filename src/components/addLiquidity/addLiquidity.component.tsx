import { useContext, useState } from "react";
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
    TextField,
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

export const AddLiquidityComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [tokenA, setTokenA] = useState<ISmartContract>(Apple);
    const [tokenB, setTokenB] = useState<ISmartContract>(Potato);
    const [amountA, setAmountA] = useState<number>(2000);
    const [amountB, setAmountB] = useState<number>(2000);

    const clickAddLiquidity = async () => {
        try {
            await smartContractService.blockchainSubscriptions.subscribePairEvents();
            await smartContractService.addLiquidity(
                tokenA,
                tokenB,
                BigInt(amountA),
                BigInt(amountB)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card className="AddLiquidityComponent">
            <CardHeader title="Add Liquidity"></CardHeader>
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
                        <FormControl variant="filled" className="item-wrapper">
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
                    <div className="item-wrapper-right">
                        <TextField
                            className="item-wrapper"
                            id="outlined-basic"
                            label="Amount"
                            variant="filled"
                            value={amountB}
                            onChange={(event) => {
                                setAmountB(Number(event.target.value));
                            }}
                        />
                    </div>
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
