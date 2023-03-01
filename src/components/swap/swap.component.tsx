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
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
    styleBox,
    styleCircularProgress,
    styleIconsProps,
} from "../../assets/styles/stypeProps";
import { BigNumber } from "ethers";
import { Subscription } from "rxjs";

export const SwapComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [tokenA, setTokenA] = useState<ITokenContract>(Apple);
    const [tokenB, setTokenB] = useState<ITokenContract>(Potato);
    const [amountA, setAmountA] = useState<number>(1000);
    const [warningSnackOpen, setWarningSnackOpen] = useState<boolean>(false);
    const [warningSnackMessage, setWarningSnackMessage] = useState<string>("");
    const [successFeeChargedSnackOpen, setSuccessFeeChargedSnackOpen] =
        useState<boolean>(false);
    const [successFeeChargedSnackMessage, setSuccessFeeChargedSnackMessage] =
        useState<string>("");
    const [successSwapSnackOpen, setSuccessSwapSnackOpen] =
        useState<boolean>(false);
    const [successSwapSnackMessage, setSuccessSwapSnackMessage] =
        useState<string>("");
    const [isSwapLoading, setIsSwapLoading] = useState<boolean>(false);

    const clickSwap = async () => {
        if (
            amountA >
            Number(
                await tokenA.instance.balanceOf(
                    await smartContractService.connectService.signer.getAddress()
                )
            )
        ) {
            let msg = "Insufficient balance of token " + tokenA.nameShort;
            console.log(msg);
            setWarningSnackMessage(msg);
            setWarningSnackOpen(true);
        } else {
            setIsSwapLoading(true);
            try {
                await smartContractService.swap(
                    tokenA.instance,
                    tokenB.instance,
                    BigNumber.from(amountA)
                );
            } catch (e) {
                console.error(e);
            }
        }
    };

    useEffect(() => {
        const subscriptions: Subscription[] = [];
        isSwapLoading &&
            subscriptions.push(
                smartContractService.blockchainSubscriptions
                    .Swapped$()
                    .subscribe((msg: string) => {
                        setIsSwapLoading(false);
                        console.log(msg);
                        setSuccessSwapSnackMessage(msg);
                        setSuccessSwapSnackOpen(true);
                    })
            );
        isSwapLoading &&
            subscriptions.push(
                smartContractService.blockchainSubscriptions
                    .FeeCharged$()
                    .subscribe((msg: string) => {
                        setIsSwapLoading(false);
                        console.log(msg);
                        setSuccessFeeChargedSnackMessage(msg);
                        setSuccessFeeChargedSnackOpen(true);
                    })
            );
        return () => {
            subscriptions.forEach((s) => s.unsubscribe());
        };
    }, [isSwapLoading]);

    const handleEqualityCheck = () => {
        if (tokenA === tokenB) {
            const indexB = tokenContracts.indexOf(tokenB);
            const newIndexB =
                indexB === tokenContracts.length - 1 ? 0 : indexB + 1;
            setTokenB(tokenContracts[newIndexB]);
            let msg = "Please select different tokens";
            console.log(msg);
            setWarningSnackMessage(msg);
            setWarningSnackOpen(true);
        }
    };

    useEffect(() => {
        handleEqualityCheck();
    }, [tokenA, tokenB]);

    return (
        <div>
            <Card className="SwapComponent">
                <CardHeader
                    title="Swap Tokens"
                    titleTypographyProps={{ variant: "h1" }}
                ></CardHeader>
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
                                            event.target.value as ITokenContract
                                        );
                                        //handleEqualityCheck();
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
                                            event.target.value as ITokenContract
                                        );
                                        //handleEqualityCheck();
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
                        <div className="swapButtonWrapper">
                            <Button
                                variant="contained"
                                color="success"
                                onClick={clickSwap}
                            >
                                Swap
                                <Box sx={styleBox}>
                                    <CurrencyExchangeIcon
                                        style={styleIconsProps}
                                    />
                                    {isSwapLoading && (
                                        <CircularProgress
                                            size={34}
                                            sx={styleCircularProgress}
                                        />
                                    )}
                                </Box>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Snackbar
                open={warningSnackOpen}
                autoHideDuration={4000}
                onClose={() => {
                    setWarningSnackOpen(false);
                }}
            >
                <Alert
                    onClose={() => {
                        setWarningSnackOpen(false);
                    }}
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    {warningSnackMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={successSwapSnackOpen}
                autoHideDuration={4000}
                onClose={() => {
                    setSuccessSwapSnackOpen(false);
                }}
            >
                <Alert
                    onClose={() => {
                        setSuccessSwapSnackOpen(false);
                    }}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {successSwapSnackMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={successFeeChargedSnackOpen}
                autoHideDuration={4000}
                onClose={() => {
                    setSuccessFeeChargedSnackOpen(false);
                }}
            >
                <Alert
                    onClose={() => {
                        setSuccessFeeChargedSnackOpen(false);
                    }}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {successFeeChargedSnackMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};
