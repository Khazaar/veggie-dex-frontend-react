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
} from "@mui/material";

import "./style.css";

import { ILiquidityPools } from "../../interfaces/liquidityPools.interface";
import { IPair } from "../../smart-contracts/smart-contract-data";
import { useTokenTransferSubscription } from "../../hooks";

export const LiquidityPoolsComponent = () => {
    const [liquidityPoolsData, setLiquidityPoolsData] = useState<
        ILiquidityPools[]
    >([]);

    const smartContractService = useContext(SmartContractServiceContext);

    const fetchData = async () => {
        const updatedLiquidityPoolsData: ILiquidityPools[] = [];
        const pairs = await smartContractService.getPairs();

        pairs.forEach((pair: IPair, index: number) => {
            updatedLiquidityPoolsData.push({
                position: index,
                reserve0: pair.reserve0,
                reserve1: pair.reserve1,
                pairName: pair.name,
            });
        });
        setLiquidityPoolsData(updatedLiquidityPoolsData);
    };

    useTokenTransferSubscription(smartContractService, fetchData);

    return (
        <Card className="LiquidityPoolsComponent">
            <CardHeader
                title="DEX Liquidity Pools"
                titleTypographyProps={{ variant: "h1" }}
            ></CardHeader>
            <CardContent>
                <TableContainer
                    component={Paper}
                    sx={{ margin: "6px", width: 300 }}
                >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Pair</TableCell>
                                <TableCell>Reserve 0</TableCell>
                                <TableCell>Reserve 1</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {liquidityPoolsData.map((row) => (
                                <TableRow
                                    key={row.position}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.pairName}
                                    </TableCell>
                                    <TableCell>
                                        {row.reserve0.toString()}
                                    </TableCell>
                                    <TableCell>
                                        {row.reserve1.toString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};
