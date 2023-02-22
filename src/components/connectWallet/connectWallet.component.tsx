import { useContext, useEffect, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import { Button } from "@mui/material";

import "./style.css";

export const ConnectWalletComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const [signerAddress, setSignerAddress] = useState("");
    const [message, setMessage] = useState("Please, connect your wallet");
    const [buttonText, setButtonText] = useState("Connect wallet");
    useEffect(() => {
        const fetchData = async () => {
            await smartContractService.connectService.initConnectService();
        };
        fetchData().catch((error) => {
            console.log(error);
        });
    });

    async function clickConnect() {
        try {
            await smartContractService.connectService.initConnectService();
            await smartContractService.initSmartContractService();

            setSignerAddress(
                await smartContractService.connectService.signer.getAddress()
            );
            setMessage(signerAddress);
            setButtonText("Wallet connected");
        } catch (error) {
            console.log(`Can't connect wallet: ${(error as Error).message}`);
        }
    }

    return (
        <div className="ConnectWalletStyle">
            <Button
                variant="contained"
                color="success"
                onClick={clickConnect}
                className="b-style"
            >
                {buttonText}
            </Button>
            <p className="p-style">{message}</p>
        </div>
    );
};
