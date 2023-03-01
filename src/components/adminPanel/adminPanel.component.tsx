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
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
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
    ITokenContract,
} from "../../smart-contracts/smart-contract-data";
import CheckIcon from "@mui/icons-material/Check";
import { useAdminRolesSubscription } from "../../hooks/useAdminRolesSubscription";
import {
    styleBox,
    styleCircularProgress,
    styleIconsProps,
} from "../../assets/styles/stypeProps";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { colorGreenLight } from "../../assets/styles/theme";
import { BigNumber } from "ethers";
import { useWalletSubscription } from "../../hooks";
import { useDexInitSubscription } from "../../hooks/useDexInitSubscription";

export const AdminPanelComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [swapFeeCurrent, setSwapFeeCurrent] = useState<number>(10);
    const [swapFeeNew, setSwapFeeNew] = useState<number>(10);
    const [minLSRBalanceCurrent, setMinLSRBalanceCurrent] =
        useState<number>(10);
    const [minLSRBalanceNew, setMinLSRBalanceNew] = useState<number>(10);
    const [feesToWithdraw, setFeesToWithdraw] = useState<number>(0);
    const [selectedToken, setSelectedToken] = useState<ITokenContract>(Apple);
    const [warningSnackOpen, setWarningSnackOpen] = useState<boolean>(false);
    const [warningSnackMessage, setWarningSnackMessage] = useState<string>("");
    const [successSnackOpen, setSuccessSnackOpen] = useState<boolean>(false);
    const [successSnackMessage, setSuccessSnackMessage] = useState<string>("");
    const [isSetLoading, setIsSetLoading] = useState(false);
    const [isSetClicked, setIsSetClicked] = useState(false);

    const clickWithdraw = async () => {
        console.log(`Going to withdraw fees`);
        await smartContractService.withdrawFees(
            selectedToken.instance,
            BigNumber.from(feesToWithdraw)
        );
    };

    const clickSet = async () => {
        setIsSetClicked(true);
        try {
            if (swapFeeNew > 0 && swapFeeNew !== swapFeeCurrent) {
                console.log(`Going to set swap fee: ${swapFeeNew}`);
                setIsSetLoading(true);
                await smartContractService.setSwapFee(
                    BigNumber.from(swapFeeNew)
                );
            }
            if (
                minLSRBalanceNew > 0 &&
                minLSRBalanceNew !== minLSRBalanceCurrent
            ) {
                console.log(
                    `Going to set min LSR balance: ${minLSRBalanceNew}`
                );
                setIsSetLoading(true);
                await smartContractService.setLsrMinBalance(
                    BigNumber.from(minLSRBalanceNew)
                );
            }
        } catch (e: any) {
            setIsSetLoading(false);
            console.log(`Error occured while minting tokens: ${e.message}`);
        }
    };

    const fetchData = async () => {
        setSwapFeeCurrent(
            Number(
                await smartContractService.connectService.contractRouter_mod.getSwapFee()
            )
        );
        setSwapFeeNew(swapFeeCurrent);
        setMinLSRBalanceCurrent(
            Number(
                await smartContractService.connectService.contractRouter_mod.getLsrMinBalance()
            )
        );
        setMinLSRBalanceNew(minLSRBalanceCurrent);
    };

    useEffect(() => {
        smartContractService.initSmartContractService();
    }, []);

    useWalletSubscription(smartContractService, fetchData);
    useDexInitSubscription(smartContractService, fetchData);

    useEffect(() => {
        const subccription = smartContractService.blockchainSubscriptions
            .SetSwapFee$()
            .subscribe((data: BigNumber) => {
                const msg = `Swap fee set to: ${data}`;
                console.log(msg);
                setSuccessSnackMessage(msg);
                setSuccessSnackOpen(true);
                setSwapFeeCurrent(swapFeeNew);
                setIsSetLoading(false);
                setIsSetClicked(false);
            });
        return () => {
            subccription.unsubscribe();
        };
    }, [isSetClicked]);

    useEffect(() => {
        const subccription = smartContractService.blockchainSubscriptions
            .SetLsrMinBalance$()
            .subscribe((data: BigNumber) => {
                const msg = `Minimum LSR balance set to: ${data}`;
                console.info(msg);
                setSuccessSnackMessage(msg);
                setSuccessSnackOpen(true);
                setMinLSRBalanceCurrent(minLSRBalanceNew);
                setIsSetLoading(false);
                setIsSetClicked(false);
            });
        return () => {
            subccription.unsubscribe();
        };
    }, [isSetClicked]);

    return (
        <div>
            <Card className="AdminPanelComponent">
                <CardHeader
                    title="Admin Panel"
                    titleTypographyProps={{ variant: "h1" }}
                ></CardHeader>
                <CardContent>
                    <div className="select-text-wrapper">
                        <div className="item-wrapper-left">
                            <TextField
                                className="item-wrapper"
                                id="outlined-basic"
                                label="Swap Fee"
                                variant="filled"
                                value={swapFeeNew}
                                onChange={(event) => {
                                    setSwapFeeNew(Number(event.target.value));
                                }}
                            />
                        </div>
                        <div className="item-wrapper-right">
                            <TextField
                                className="item-wrapper"
                                id="outlined-basic"
                                label="Min LSR Balance"
                                variant="filled"
                                value={minLSRBalanceNew}
                                onChange={(event) => {
                                    setMinLSRBalanceNew(
                                        Number(event.target.value)
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={clickSet}
                    >
                        Set
                        <Box sx={styleBox}>
                            <CheckIcon style={styleIconsProps} />
                            {isSetLoading && (
                                <CircularProgress
                                    size={30}
                                    sx={styleCircularProgress}
                                />
                            )}
                        </Box>
                    </Button>

                    <Divider
                        variant="middle"
                        style={{
                            width: "90%",
                            borderBottomWidth: 1,
                            background: colorGreenLight,
                            margin: "18px 0 6px 0",
                        }}
                    />
                    <Typography variant="h3">Fees to withdraw: </Typography>
                    <div className="select-text-wrapper">
                        <div className="item-wrapper-left">
                            <FormControl variant="filled">
                                <InputLabel id="select-tokenA-to-addLiq-label">
                                    Token
                                </InputLabel>
                                <Select
                                    value={selectedToken || ""}
                                    labelId="select-tokenA-to-addLiq-label"
                                    id="select-token-to-mint"
                                    onChange={(event) => {
                                        setSelectedToken(
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
                                value={feesToWithdraw}
                                onChange={(event) => {
                                    setFeesToWithdraw(
                                        Number(event.target.value)
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={clickWithdraw}
                    >
                        Withdraw
                        <ArrowDownwardIcon style={styleIconsProps} />
                    </Button>
                </CardContent>
            </Card>
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
        </div>
    );
};
