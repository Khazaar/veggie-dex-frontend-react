import { Button } from "@mui/material";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { styleIconsProps } from "../../assets/styles/stypeProps";
import "./style.css";
import { useContext, useEffect } from "react";
import { SmartContractServiceContext } from "../../App";

export const ProfileComponent = () => {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const { disconnect } = useDisconnect();
    const smartContractService = useContext(SmartContractServiceContext);
    useEffect(() => {
        if (isConnected) {
            smartContractService.initSmartContractService();
        }
    }, []);

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
                <div>{address}</div>
            </div>
        );
    return (
        <Button
            variant="contained"
            color="success"
            className="b-style"
            onClick={async () => {
                connect();
                await smartContractService.initSmartContractService();
            }}
        >
            Connect Wallet
            <AccountBalanceWalletIcon style={styleIconsProps} />
        </Button>
    );
};
