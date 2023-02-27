import { useContext, useEffect, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import {
    Alert,
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
import { IPair } from "../../smart-contracts/smart-contract-data";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { styleIconsProps } from "../../assets/styles/stypeProps";
import {
    useTokenTransferSubscription,
    useWalletSubscription,
} from "../../hooks";
import { BigNumber } from "ethers";

export const RemoveLiquidityComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const [pairs, setPairs] = useState<IPair[]>([]);
    const [selectedPair, setSelectedPair] = useState<IPair>();
    const [liquidityToRmove, setLiquidityToRmove] = useState<number>(0);
    const [liquidityAvailable, setLiquidityAvailable] = useState<number>(0);
    const [warningSnackOpen, setWarningSnackOpen] = useState<boolean>(false);
    const [warningSnackMessage, setWarningSnackMessage] = useState<string>("");

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
            } catch (error) {
                console.log(error);
            }
        }
    };

    const fetchData = async () => {
        setPairs(await smartContractService.getPairs());
        if (pairs.length > 0) {
            const newPair = pairs[0];
            setSelectedPair(newPair);
            setLiquidityAvailable(
                Number(
                    await selectedPair.instance.balanceOf(
                        await smartContractService.connectService.signer.getAddress()
                    )
                )
            );
            setLiquidityToRmove(liquidityAvailable);
        }
    };

    const onSelectedPairChange = async (event: any) => {
        setSelectedPair(event.target.value as IPair);
        setLiquidityToRmove(
            Number(
                await (event.target.value as IPair).instance.balanceOf(
                    smartContractService.connectService.signer.getAddress()
                )
            )
        );
    };
    useTokenTransferSubscription(smartContractService, fetchData);
    useWalletSubscription(smartContractService, fetchData);
    return (
        <div>
            {pairs.length > 0 && (
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
                                        labelId="select-tokenA-to-addLiq-label"
                                        id="select-token-to-mint"
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
                            <RemoveCircleOutlineIcon style={styleIconsProps} />
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
        </div>
    );
};
