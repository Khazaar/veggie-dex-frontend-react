import { useContext, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
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
import { useRefresh } from "../../hooks/useRefresh";
import { styleIconsProps } from "../../assets/styles/stypeProps";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { colorGreenLight } from "../../assets/styles/theme";

export const AdminPanelComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [swapFee, setSwapFee] = useState<number>(10);
    const [selectedToken, setSelectedToken] = useState<ITokenContract>(Apple);
    const [minLSRBalance, setMinLSRBalance] = useState<number>(10);
    const [feesToWithdraw, setFeesToWithdraw] = useState<number>(0);

    const clickWithdraw = async () => {
        console.log(`Going to withdraw fees`);
        await smartContractService.withdrawFees(
            selectedToken.instance,
            feesToWithdraw
        );
    };

    const clickSet = async () => {};

    const fetchData = async () => {
        // setSwapFee(
        //     await smartContractService.connectService.contractRouter_mod.getSwapFee().to
        // );
        // setMinLSRBalance(
        //     await smartContractService.connectService.contractRouter_mod.getLsrMinBalance()
        // );
    };
    useRefresh(smartContractService, fetchData);

    return (
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
                            value={swapFee}
                            onChange={(event) => {
                                setSwapFee(Number(event.target.value));
                            }}
                        />
                    </div>
                    <div className="item-wrapper-right">
                        <TextField
                            className="item-wrapper"
                            id="outlined-basic"
                            label="Min LSR Balance"
                            variant="filled"
                            value={minLSRBalance}
                            onChange={(event) => {
                                setMinLSRBalance(Number(event.target.value));
                            }}
                        />
                    </div>
                </div>

                <Button variant="contained" color="success" onClick={clickSet}>
                    Set
                    <CheckIcon style={styleIconsProps} />
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
                            value={feesToWithdraw}
                            onChange={(event) => {
                                setFeesToWithdraw(Number(event.target.value));
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
    );
};