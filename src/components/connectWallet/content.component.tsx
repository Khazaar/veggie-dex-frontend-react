import { useContext, useState } from "react";
import { ethers } from "ethers";
import { SmartContractService } from "../../services/smart-contract.service";
import { ConnectService } from "../../services/connect.service";
import { SmartContractServiceContext } from "../../App";

import "./style.css";
import React from "react";

export const ConnectWalletComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const [signerAddress, setSignerAddress] = useState("");
    const [message, setMessage] = useState("Please, connect your wallet");
    const [buttonText, setButtonText] = useState("Connect wallet");
    //let buttonText: string = "Connect wallet";

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

    // if (signerAddress) {
    //     setButtonText("Wallet connected");
    // }

    return (
        <div className="vd-connect-wallet">
            <button onClick={clickConnect}>{buttonText}</button>
            <p>{message}</p>
        </div>
    );
};
