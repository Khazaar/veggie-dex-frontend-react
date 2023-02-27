import { useContext, useEffect, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import { Button } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import "./style.css";
import { styleIconsProps } from "../../assets/styles/stypeProps";
import { useWalletSubscription } from "../../hooks";

export const ConnectWalletComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const [message, setMessage] = useState("Please, connect your wallet");
    const [buttonText, setButtonText] = useState("Connect wallet");

    const fetchData = async () => {
        try {
            //await smartContractService.connectService.initConnectService();
            await smartContractService.initSmartContractService();
            setMessage(
                await smartContractService.connectService.signer.getAddress()
            );
            setButtonText("Wallet connected");
        } catch (error) {
            console.log(`Can't connect wallet: ${(error as Error).message}`);
        }
    };
    useEffect(() => {
        fetchData();
    });

    // useWalletSubscription(smartContractService, fetchData);

    async function clickConnect() {
        await fetchData();
    }

    return (
        <div className="ConnectWalletStyle">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={clickConnect}
                    className="b-style"
                >
                    {buttonText}
                    <AccountBalanceWalletIcon style={styleIconsProps} />
                </Button>
            </div>
            <p className="p-style">{message}</p>
        </div>
    );
};
