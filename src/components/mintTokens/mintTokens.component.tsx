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
import DiamondIcon from "@mui/icons-material/Diamond";
import { styleIconsProps } from "../../assets/styles/stypeProps";
import { SelectNetworkComponent } from "../selectNetwork/selectNetwork.component";

export const MintTokensComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [tokenToMint, setTokenToMint] = useState<ISmartContract>(Apple);
    const [amountToMint, setAmountToMint] = useState<number>(10000);

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
                                        event.target.value as ISmartContract
                                    );
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

                <Button variant="contained" color="success" onClick={clickMint}>
                    Mint
                    <DiamondIcon style={styleIconsProps} />
                </Button>
            </CardContent>
        </Card>
    );
};
