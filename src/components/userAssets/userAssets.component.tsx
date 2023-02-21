import { useContext, useEffect, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import {
    Card,
    CardContent,
    CardHeader,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import "./style.css";
import { tokenAsset } from "../../interfaces/tokenAssets.interface";

export const UserAssetsComponent = () => {
    let ASSET_DATA: tokenAsset[] = [
        { position: 2, name: "Apple", amount: BigInt(0) },
        { position: 3, name: "Potato", amount: BigInt(0) },
        { position: 3, name: "Tomato", amount: BigInt(0) },
        { position: 4, name: "LSR", amount: BigInt(0) },
    ];
    const [ETHBalance, setETHBalance] = useState("");

    const smartContractService = useContext(SmartContractServiceContext);
    useEffect(() => {
        const fetchData = async () => {
            const potatoBalance: BigInt =
                await smartContractService.getTokensBalance(
                    smartContractService.connectService.contractPotato
                );
            const tomatoBalance: BigInt =
                await smartContractService.getTokensBalance(
                    smartContractService.connectService.contractTomato
                );

            const appleBalance: BigInt =
                await smartContractService.getTokensBalance(
                    smartContractService.connectService.contractApple
                );

            const lsrBalance: BigInt =
                await smartContractService.getTokensBalance(
                    smartContractService.connectService.contractLSR
                );
            ASSET_DATA[0].amount = appleBalance;
            ASSET_DATA[1].amount = potatoBalance;
            ASSET_DATA[2].amount = tomatoBalance;
            ASSET_DATA[3].amount = lsrBalance;
            setETHBalance(await smartContractService.getSignerBalance());
        };
        fetchData();
    });

    return (
        <div className="user-assets">
            <Card>
                <CardHeader title="User Assets"></CardHeader>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Token</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ASSET_DATA.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.amount.toString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="text-balance">
                        <Typography variant="h4">ETH balance: </Typography>
                        <Typography variant="h4">{ETHBalance} </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
