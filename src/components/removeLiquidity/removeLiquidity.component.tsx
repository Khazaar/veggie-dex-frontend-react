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
    TextField,
} from "@mui/material";

import "./style.css";
import "../../assets/styles/styles.css";
import { IPair } from "../../smart-contracts/smart-contract-data";
import { useRefresh } from "../../hooks/useRefresh";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { styleIconsProps } from "../../assets/styles/stypeProps";

export const RemoveLiquidityComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const [pairs, setPairs] = useState<IPair[]>([]);
    const [selectedPair, setSelectedPair] = useState<IPair>();
    const [liquidityToRmove, setLiquidityToRmove] = useState<number>(0);

    const clickRemoveLiquidity = async () => {
        try {
            await smartContractService.blockchainSubscriptions.subscribePairEvents();
            await smartContractService.removeLiquidity(
                selectedPair.token0,
                selectedPair.token1,
                BigInt(liquidityToRmove)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {
        setPairs(await smartContractService.getPairs());
        if (pairs.length > 0) {
            setSelectedPair(pairs[0]);
            setLiquidityToRmove(
                await selectedPair.instance.balanceOf(
                    smartContractService.connectService.signer.getAddress()
                )
            );
        }
    };

    const onSelectedPairChange = async (event: any) => {
        setSelectedPair(event.target.value as IPair);
        setLiquidityToRmove(
            await (event.target.value as IPair).instance.balanceOf(
                smartContractService.connectService.signer.getAddress()
            )
        );
    };
    useRefresh(smartContractService, fetchData);
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
                                        value={selectedPair || ""}
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
        </div>
    );
};
