import { Button, Typography } from "@mui/material";
import {
    useAccount,
    useConnect,
    useDisconnect,
    useNetwork,
    useSigner,
    useSwitchNetwork,
} from "wagmi";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { styleIconsProps } from "../../assets/styles/stypeProps";
import "./style.css";
import { Provider, useContext, useEffect } from "react";
import { SmartContractServiceContext } from "../../App";

export const ProfileComponent = () => {
    const { connector: activeConnector, isConnected, address } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { data: signer } = useSigner();
    const { chain } = useNetwork();
    const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
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
            <div className="container">
                <Button
                    onClick={() => disconnect()}
                    variant="outlined"
                    color="error"
                    className="b-style"
                >
                    Disconnect wallet
                </Button>
                <Typography variant="h5">
                    {address.substring(0, 6) +
                        "..." +
                        address.substring(38, 42)}{" "}
                    {/* {activeConnector.name} */}
                </Typography>
            </div>
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
