import "./style.css";
import React from "react";
import { ConnectWalletComponent } from "../../components/connectWallet/connectWallet.component";
import logo from "../../assets/images/Logo_2.png";
import { SelectNetworkComponent } from "../../components/selectNetwork/selectNetwork.component";

export const HeaderComponent = () => {
    return (
        <div className="HeaderComponent">
            <div>
                <img className="image-wrapper" src={logo} alt="#" />
            </div>
            <SelectNetworkComponent></SelectNetworkComponent>
            <ConnectWalletComponent></ConnectWalletComponent>
        </div>
    );
};
