import "./style.css";
import React from "react";
import { ConnectWalletComponent } from "../../components/connectWallet/connectWallet.component";
import logo from "../../assets/images/Logo_2.png";
import { SelectNetworkComponent } from "../../components/selectNetwork/selectNetwork.component";
import { ConnectWalletWeb3ModalComponent } from "../../components/connectWalletWeb3Modal/connectWalletWeb3Modal.component";
import { Box } from "@mui/material";

export const HeaderLayout = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "3px",
                alignItems: "center",
                flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                },
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: "270px",
                        sm: "350px",
                        md: "350px",
                        lg: "350px",
                    },
                    marginBottom: "-5px",
                    padding: "0px",
                }}
            >
                <img className="image-wrapper" src={logo} alt="#" />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <SelectNetworkComponent></SelectNetworkComponent>

                <ConnectWalletWeb3ModalComponent></ConnectWalletWeb3ModalComponent>
            </Box>
        </Box>
    );
};
