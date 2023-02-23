import { useContext, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";

import "./style.css";
import "../../assets/styles/styles.css";
import {
    Apple,
    Potato,
    Tomato,
    LSR,
    ISmartContract,
} from "../../smart-contracts/smart-contract-data";
import { ITokenAsset } from "../../interfaces/tokenAssets.interface";
import { useRefresh } from "../../hooks/useRefresh";

export const AdminPanelComponent = () => {
    let initAssets: ITokenAsset[] = [
        { position: 2, name: "Apple", amount: BigInt(0) },
        { position: 3, name: "Potato", amount: BigInt(0) },
        { position: 3, name: "Tomato", amount: BigInt(0) },
        { position: 4, name: "LSR", amount: BigInt(0) },
    ];

    const smartContractService = useContext(SmartContractServiceContext);
    const tokenContracts = [Apple, Potato, Tomato, LSR];
    const [swapFee, setSwapFee] = useState<number>(10);
    const [minLSRBalance, setMinLSRBalance] = useState<number>(10);
    const [assetsData, setAssetsData] = useState<ITokenAsset[]>(initAssets);

    const clickSet = async () => {};

    const fetchData = async () => {
        let updatedAssets = assetsData;

        setSwapFee(
            await smartContractService.connectService.contractRouter_mod.getSwapFee()
        );

        setMinLSRBalance(
            await smartContractService.connectService.contractRouter_mod.getLsrMinBalance()
        );
        const potatoBalance: BigInt =
            await smartContractService.connectService.contractPotato.balanceOf(
                smartContractService.connectService.contractRouter_mod.address
            );
        const tomatoBalance: BigInt =
            await smartContractService.connectService.contractTomato.balanceOf(
                smartContractService.connectService.contractRouter_mod.address
            );

        const appleBalance: BigInt =
            await smartContractService.connectService.contractApple.balanceOf(
                smartContractService.connectService.contractRouter_mod.address
            );

        const lsrBalance: BigInt =
            await smartContractService.connectService.contractLSR.balanceOf(
                smartContractService.connectService.contractRouter_mod.address
            );

        updatedAssets[0].amount = appleBalance;
        updatedAssets[1].amount = potatoBalance;
        updatedAssets[2].amount = tomatoBalance;
        updatedAssets[3].amount = lsrBalance;
        setAssetsData(updatedAssets);
    };
    useRefresh(smartContractService, fetchData);

    return (
        <Card className="AdminPanelComponent">
            <CardHeader title="Admin Panel"></CardHeader>
            <CardContent>
                <div className="select-text-wrapper">
                    <div className="item-wrapper-left"></div>
                </div>

                <Button variant="contained" color="success" onClick={clickSet}>
                    Set
                </Button>
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
                                        "&:last-child td, &:last-child th": {
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
            </CardContent>
        </Card>
    );
};
