import { useContext, useEffect, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
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
import {
    styleIconsProps,
    styleBox,
    styleCircularProgress,
} from "../../assets/styles/stypeProps";
import { BigNumber } from "ethers";
import { green } from "@mui/material/colors";
import { Subscription } from "rxjs";

export const MintTokensComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [tokenToMint, setTokenToMint] = useState<ITokenContract>(Apple);
    const [amountToMint, setAmountToMint] = useState<number>(10000);
    const [mintedSnackOpen, setMintedSnackOpen] = useState<boolean>(false);
    const [revertedSnackOpen, setRevertedSnackOpen] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");
    const [isMintLoading, setIsMintLoading] = useState<boolean>(false);
    const [mintClicked, setMintClicked] = useState<boolean>(false);
    const clickMint = async () => {
        setMintClicked(true);
        try {
            if (amountToMint > 0) {
                console.log(
                    `Going to mint token ${tokenToMint.nameLong} in amount: ${amountToMint}`
                );
                if (amountToMint > 1000000) {
                    console.log(`Please, mint less then 1000000 tokens`);
                } else {
                    setIsMintLoading(true);
                    await smartContractService.mintTokens(
                        tokenToMint.instance,
                        BigNumber.from(amountToMint)
                    );
                }
            }
        } catch (e: any) {
            console.log(`Error occured while minting tokens: ${e.message}`);
            setIsMintLoading(false);
        }
    };

    useEffect(() => {
        const subscription: Subscription =
            smartContractService.blockchainSubscriptions
                .TokenMinted$()
                .subscribe(() => {
                    setIsMintLoading(false);
                    mintClicked && setMintedSnackOpen(true);
                    setSnackMessage(
                        `Minted ${amountToMint} of ${tokenToMint.nameShort} tokens!`
                    );
                    setMintClicked(false);
                });
        return () => {
            subscription.unsubscribe();
        };
    }, [mintClicked]);

    useEffect(() => {
        const subscription: Subscription =
            smartContractService.blockchainSubscriptions
                .MintRevertedPeriod$()
                .subscribe((msg) => {
                    setIsMintLoading(false);
                    mintClicked && setRevertedSnackOpen(true);
                    setSnackMessage(msg);
                    setMintClicked(false);
                });
        return () => {
            subscription.unsubscribe();
        };
    }, [mintClicked]);

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
                        <Box sx={styleBox}>
                            <DiamondIcon style={styleIconsProps} />
                            {isMintLoading && (
                                <CircularProgress
                                    size={30}
                                    sx={styleCircularProgress}
                                />
                            )}
                        </Box>
                    </Button>
                </CardContent>
            </Card>
            <Snackbar
                open={mintedSnackOpen}
                autoHideDuration={4000}
                onClose={() => {
                    setMintedSnackOpen(false);
                }}
            >
                <Alert
                    onClose={() => {
                        setMintedSnackOpen(false);
                    }}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {snackMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={revertedSnackOpen}
                autoHideDuration={4000}
                onClose={() => {
                    setRevertedSnackOpen(false);
                }}
            >
                <Alert
                    onClose={() => {
                        setRevertedSnackOpen(false);
                    }}
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    {snackMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};
