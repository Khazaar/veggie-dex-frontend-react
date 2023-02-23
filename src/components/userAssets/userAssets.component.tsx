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
import { ITokenAsset } from "../../interfaces/tokenAssets.interface";
import { useRefresh } from "../../hooks/useRefresh";

export const UserAssetsComponent = () => {
    let initAssets: ITokenAsset[] = [
        { position: 2, name: "Apple", amount: BigInt(0) },
        { position: 3, name: "Potato", amount: BigInt(0) },
        { position: 3, name: "Tomato", amount: BigInt(0) },
        { position: 4, name: "LSR", amount: BigInt(0) },
    ];
    const [ETHBalance, setETHBalance] = useState("");
    const [assetsData, setAssetsData] = useState<ITokenAsset[]>(initAssets);

    const smartContractService = useContext(SmartContractServiceContext);

    const fetchData = async () => {
        let updatedAssets = assetsData;
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

        const lsrBalance: BigInt = await smartContractService.getTokensBalance(
            smartContractService.connectService.contractLSR
        );

        updatedAssets[0].amount = appleBalance;
        updatedAssets[1].amount = potatoBalance;
        updatedAssets[2].amount = tomatoBalance;
        updatedAssets[3].amount = lsrBalance;
        setAssetsData(updatedAssets);
        setETHBalance(await smartContractService.getSignerBalance());
    };

    useRefresh(smartContractService, fetchData);

    return (
        <div className="user-assets">
            <Card>
                <CardHeader title="User Assets"></CardHeader>
                <CardContent>
                    <TableContainer
                        component={Paper}
                        sx={{ margin: "6px", width: 300 }}
                    >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Token</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assetsData.map((row) => (
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
                                        <TableCell>
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
