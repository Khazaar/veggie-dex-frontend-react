import { useContext, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import { Button } from "@mui/material";

import "./style.css";

export const ConnectWalletComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const [signerAddress, setSignerAddress] = useState("");
    const [message, setMessage] = useState("Please, connect your wallet");
    const [buttonText, setButtonText] = useState("Connect wallet");

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
        <div className="vd-connect-wallet">
            <Button variant="contained" color="success" onClick={clickConnect}>
                {buttonText}
            </Button>
            <p>{message}</p>
        </div>
    );
};
