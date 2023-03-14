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
import { IPair } from "../../smart-contracts/smart-contract-data";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
    styleBox,
    styleCircularProgress,
    styleIconsProps,
} from "../../assets/styles/stypeProps";
import { BigNumber } from "ethers";
import { useDexInitSubscription } from "../../hooks/useDexInitSubscription";
import { Subscription } from "rxjs";

export const RemoveLiquidityComponent = () => {
    const pairZero: IPair = { name: "Select pair" };
    const smartContractService = useContext(SmartContractServiceContext);
    const [pairs, setPairs] = useState<IPair[]>([]);
    const [selectedPair, setSelectedPair] = useState<IPair>(pairZero);
    const [liquidityToRmove, setLiquidityToRmove] = useState<number>(0);
    const [liquidityAvailable, setLiquidityAvailable] = useState<number>(0);
    const [warningSnackOpen, setWarningSnackOpen] = useState<boolean>(false);
    const [warningSnackMessage, setWarningSnackMessage] = useState<string>("");
    const [successSnackOpen, setSuccessSnackOpen] = useState<boolean>(false);
    const [successSnackMessage, setSuccessSnackMessage] = useState<string>("");
    const [isRemoveLoading, setIsRemoveLoading] = useState<boolean>(false);
    const [isDexInited, setDexInited] = useState<boolean>(false);

    const clickRemoveLiquidity = async () => {
        if (liquidityToRmove > liquidityAvailable) {
            let msg = "Insufficient liquidity in pair " + selectedPair.name;
            console.log(msg);
            setWarningSnackMessage(msg);
            setWarningSnackOpen(true);
        } else {
            try {
                //await smartContractService.blockchainSubscriptions.subscribePairEvents();
                await smartContractService.removeLiquidity(
                    selectedPair.token0.instance,
                    selectedPair.token1.instance,
                    BigNumber.from(liquidityToRmove)
                );
                setIsRemoveLoading(true);
            } catch (error) {
                console.log(error);
                setIsRemoveLoading(false);
            }
        }
    };

    useEffect(() => {
        isDexInited &&
            smartContractService
                .getPairs()
                .then((pairs) => {
                    setPairs(pairs);
                })
                .catch((error) => {
                    console.log(error);
                });
    }, [isDexInited]);
    useEffect(() => {
        const subscription: Subscription =
            smartContractService.blockchainSubscriptions
                .LiquidityAdded$()
                .subscribe(({ amountA, amountB }) => {
                    smartContractService.getPairs().then((pairs) => {
                        setPairs(pairs);
                    });
                });
        return () => {
            subscription.unsubscribe();
        };
    });

    useEffect(() => {
        if (pairs && pairs.length > 0) {
            const newPair = pairs[0];
            setSelectedPair(newPair);
        }
    }, [pairs]);

    const onSelectedPairChange = async (event: any) => {
        setSelectedPair(event.target.value as IPair);
    };

    useEffect(() => {
        selectedPair != pairZero &&
            smartContractService
                .getLiquidityAvailable(selectedPair.instance)
                .then((liq) => {
                    setLiquidityAvailable(Number(liq));
                    setLiquidityToRmove(Number(liq));
                });
    }, [selectedPair]);

    useDexInitSubscription(smartContractService, setDexInited);

    useEffect(() => {
        const subscription = smartContractService.blockchainSubscriptions
            .LiquidityRemoved$()
            .subscribe(({ amount0, amount1 }) => {
                const msg = `Liquidity removed: pair ${selectedPair.name}. Amount 0: ${amount0}, amount 1:  ${amount1}`;
                console.log(msg);
                setSuccessSnackOpen(true);
                setSuccessSnackMessage(msg);
                setIsRemoveLoading(false);
                smartContractService.getPairs().then((pairs) => {
                    setPairs(pairs);
                });
            });
        return () => {
            subscription.unsubscribe();
        };
    }, [isRemoveLoading]);

    return (
        <>
            {pairs && pairs.length > 0 && (
                <Card className="RemoveLiquidityComponent">
                    <CardHeader
                        title="Rmove Liquidity"
                        titleTypographyProps={{ variant: "h1" }}
                    ></CardHeader>
                    <CardContent>
                        <div className="select-text-wrapper">
                            <div className="item-wrapper-left">
                                <FormControl variant="filled">
                                    <InputLabel id="select-tokenA-to-addLiq-label">
                                        Pair
                                    </InputLabel>
                                    <Select
                                        value={selectedPair}
                                        labelId="select-remove-liq-pair-label"
                                        id="select-remove-liq-pair"
                                        onChange={onSelectedPairChange}
                                    >
                                        {pairs.map((pr) => (
                                            //@ts-ignore - necessary to load object into value
                                            <MenuItem value={pr} key={pr.name}>
                                                {pr.name}
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
                                    value={liquidityToRmove}
                                    onChange={(event) => {
                                        setLiquidityToRmove(
                                            Number(event.target.value)
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={clickRemoveLiquidity}
                        >
                            Remove Liquidity
                            <Box sx={styleBox}>
                                <RemoveCircleOutlineIcon
                                    style={styleIconsProps}
                                />
                                {isRemoveLoading && (
                                    <CircularProgress
                                        size={30}
                                        sx={styleCircularProgress}
                                    />
                                )}
                            </Box>
                        </Button>
                    </CardContent>
                </Card>
            )}
            <Snackbar
                open={warningSnackOpen}
                autoHideDuration={3500}
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
                open={successSnackOpen}
                autoHideDuration={4000}
                onClose={() => {
                    setSuccessSnackOpen(false);
                }}
            >
                <Alert
                    onClose={() => {
                        setSuccessSnackOpen(false);
                    }}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {successSnackMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
