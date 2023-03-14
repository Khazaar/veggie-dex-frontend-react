import { Button, Typography } from "@mui/material";
import { useAccount, useConnect, useSigner } from "wagmi";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { styleIconsProps } from "../../assets/styles/stypeProps";
import "./style.css";
import { Provider, useContext, useEffect } from "react";
import { IsAppConnected, SmartContractServiceContext } from "../../App";

export const ProfileComponent = () => {
    const { connector: activeConnector, isConnected, address } = useAccount();
    const { connect, connectors } = useConnect();
    const { data: signer } = useSigner();
    const smartContractService = useContext(SmartContractServiceContext);
    useEffect(() => {
        if (isConnected) {
            signer &&
                smartContractService.connectService
                    .initConnectService(signer)
                    .then(() => {
                        console.info("Connect service initialized");
                        smartContractService
                            .initSmartContractService()
                            .then(() => {
                                console.info(
                                    "Smart contract service initialized"
                                );
                            });
                    });
        }
    }, [isConnected, signer]);

    if (isConnected)
        return (
            <Button
                variant="contained"
                color="success"
                className="b-style"
                onClick={async () => {
                    connect({ connector: connectors[0] });
                    await smartContractService.initSmartContractService();
                }}
            >
                <AccountBalanceWalletIcon
                    style={styleIconsProps}
                    sx={{ marginRight: "3px" }}
                />
                {" Addr.: " +
                    address.substring(0, 6) +
                    "..." +
                    address.substring(38, 42)}{" "}
            </Button>
        );
    return (
        <Button
            variant="contained"
            color="success"
            className="b-style"
            onClick={async () => {
                connect({ connector: connectors[0] });
                await smartContractService.initSmartContractService();
            }}
        >
            Connect Wallet
            <AccountBalanceWalletIcon style={styleIconsProps} />
        </Button>
    );
};
