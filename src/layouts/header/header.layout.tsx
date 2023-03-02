import "./style.css";
import React from "react";
import { ConnectWalletComponent } from "../../components/connectWallet/connectWallet.component";
import logo from "../../assets/images/Logo_2.png";
import { SelectNetworkComponent } from "../../components/selectNetwork/selectNetwork.component";
import { ConnectWalletWeb3ModalComponent } from "../../components/connectWalletWeb3Modal/connectWalletWeb3Modal.component";

export const HeaderLayout = () => {
    return (
        <div className="HeaderComponent">
            <div>
                <img className="image-wrapper" src={logo} alt="#" />
            </div>
            <SelectNetworkComponent></SelectNetworkComponent>
            <ConnectWalletWeb3ModalComponent></ConnectWalletWeb3ModalComponent>
        </div>
    );
};
