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
    Snackbar,
    TextField,
} from "@mui/material";

import "./style.css";
import "../../assets/styles/styles.css";
import {
    Apple,
    Potato,
    Tomato,
    LSR,
    ITokenContract,
} from "../../smart-contracts/smart-contract-data";
import DiamondIcon from "@mui/icons-material/Diamond";
import { styleIconsProps } from "../../assets/styles/stypeProps";
import { BigNumber } from "ethers";

export const MintTokensComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [tokenToMint, setTokenToMint] = useState<ITokenContract>(Apple);
    const [amountToMint, setAmountToMint] = useState<number>(10000);
    const [mintedSnackOpen, setMintedSnackOpen] = useState<boolean>(false);

    const clickMint = async () => {
        try {
            if (amountToMint > 0) {
                console.log(
                    `Going to mint token ${tokenToMint.nameLong} in amount: ${amountToMint}`
                );
                if (amountToMint > 1000000) {
                    console.log(`Please, mint less then 1000000 tokens`);
                } else {
                    await smartContractService.mintTokens(
                        tokenToMint.instance,
                        BigNumber.from(amountToMint)
                    );
                }
            }
        } catch (e) {
            console.log(`Error occured while minting tokens: ${e}`);
        }
    };

    useEffect(() => {
        const sub = smartContractService.blockchainSubscriptions
            .TokenMinted$()
            .subscribe(() => {
                setMintedSnackOpen(true);
                console.log(`Mint done triggered`);
            });
        return () => sub.unsubscribe();
    });

    return (
        <div>
            <Card className="MintTokensComponent">
                <CardHeader
                    title="Mint Tokens"
                    titleTypographyProps={{ variant: "h1" }}
                ></CardHeader>
                <CardContent>
                    <div className="select-text-wrapper">
                        <div className="item-wrapper-left">
                            <FormControl variant="filled">
                                <InputLabel id="select-token-to-mint-label">
                                    Token
                                </InputLabel>
                                <Select
                                    value={tokenToMint}
                                    labelId="select-token-to-mint-label"
                                    id="select-token-to-mint"
                                    onChange={(event) => {
                                        setTokenToMint(
                                            event.target.value as ITokenContract
                                        );
                                    }}
                                >
                                    {tokenContracts.map((tkn) => (
                                        //@ts-ignore - necessary to load object into value
                                        <MenuItem
                                            value={tkn}
                                            key={tkn.nameShort}
                                        >
                                            {tkn.nameShort}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="item-wrapper-right">
                            <TextField
                                id="outlined-basic"
                                label="Amount"
                                variant="filled"
                                value={amountToMint}
                                onChange={(event) => {
                                    setAmountToMint(Number(event.target.value));
                                }}
                            />
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={clickMint}
                    >
                        Mint
                        <DiamondIcon style={styleIconsProps} />
                    </Button>
                </CardContent>
            </Card>
            <Snackbar
                open={mintedSnackOpen}
                autoHideDuration={2000}
                message="Tokes minted!"
                onClose={() => {
                    setMintedSnackOpen(false);
                }}
            />
        </div>
    );
};
