import "./App.css";
import { SmartContractService } from "./services/smartContract.service";
import { ThemeProvider } from "@mui/material/styles";
import { HeaderLayout } from "./layouts/header/header.layout";
import { UserLayout } from "./layouts/user/user.layout";
import { DexLayout } from "./layouts/dex/dex.layout";
import { theme } from "./assets/styles/theme";
import { MenuLayout } from "./layouts/menu/menu.layout";
import { createContext, useContext, useEffect } from "react";
import {
    Box,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import { publicProvider } from "wagmi/providers/public";

import { SxProps } from "@mui/system";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { bscTestnet, sepolia, hardhat } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ContactContent } from "./layouts/menu/contentMenu.components";
export let SmartContractServiceContext = createContext<SmartContractService>(
    new SmartContractService()
);

export const IsAppConnected = createContext<boolean>(false);

const { chains, provider } = configureChains(
    [bscTestnet, sepolia, hardhat],
    [publicProvider()]
);
// const { connectors } = getDefaultWallets({
//     appName: "My RainbowKit App",
//     chains,
// });
const client = createClient({
    autoConnect: false,
    connectors: [
        new InjectedConnector({
            chains: chains,
            options: {
                name: "Injected22",
                shimDisconnect: true,
            },
        }),
    ],
    provider: provider,
});

function App() {
    const { connector: activeConnector, isConnected, address } = useAccount();
    const sxBoxContent: SxProps = {
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "column", lg: "row" },
        width: "100%",
        height: "100%",
        //backgroundColor: "#121212",
    };
    let isAppConnected = useContext(IsAppConnected);
    const sxBoxContentMenu: SxProps = {
        display: "flex",
        flexDirection: {
            xs: "column-reverse",
            sm: "row",
            md: "row",
            lg: "row",
        },
        maxWidth: "1200px",
        alignItems: {
            xs: "center",
            sm: "flex-start",
            md: "flex-start",
            lg: "flex-start",
        },
        //backgroundColor: "#121212",
        height: "100%",
    };
    useEffect(() => {}, [isAppConnected]);

    return (
        <WagmiConfig client={client}>
            <ThemeProvider theme={theme}>
                <Box sx={{ backgroundColor: "#121212" }}>
                    <div className="background-image">
                        <HeaderLayout></HeaderLayout>

                        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
                            <Box sx={sxBoxContentMenu}>
                                {isConnected && (
                                    <Box sx={sxBoxContent}>
                                        <UserLayout></UserLayout>
                                        <DexLayout></DexLayout>
                                    </Box>
                                )}
                                {!isConnected && (
                                    <Box
                                        sx={{
                                            background: "white",
                                            margin: {
                                                xs: "20px",
                                                sm: "20px auto auto auto",
                                                md: "20px auto auto auto",
                                                lg: "20px auto auto auto",
                                            },
                                            padding: "20px",
                                            borderRadius: "10px",
                                            maxWidth: "90vh",
                                        }}
                                    >
                                        <Typography>
                                            Please, connect your Metamask
                                            wallet!
                                        </Typography>
                                        <Typography>
                                            Supported networks: BSC Testnet,
                                            Sepolia, Hardhat Local
                                        </Typography>
                                    </Box>
                                )}
                                <MenuLayout></MenuLayout>
                            </Box>
                        </Box>
                    </div>
                </Box>
            </ThemeProvider>
        </WagmiConfig>
    );
}

export default App;
