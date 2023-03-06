import "./App.css";
import { SmartContractService } from "./services/smartContract.service";
import { ThemeProvider } from "@mui/material/styles";
import { HeaderLayout } from "./layouts/header/header.layout";
import { UserLayout } from "./layouts/user/user.layout";
import { DexLayout } from "./layouts/dex/dex.layout";
import { theme } from "./assets/styles/theme";
import { MenuLayout } from "./layouts/menu/menu.layout";
import { createContext } from "react";
import { Box } from "@mui/material";
import { publicProvider } from "wagmi/providers/public";

import { SxProps } from "@mui/system";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { bscTestnet, sepolia } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
export const SmartContractServiceContext = createContext<SmartContractService>(
    new SmartContractService()
);

const { chains, provider } = configureChains(
    [bscTestnet, sepolia],
    [publicProvider()]
);
// const { connectors } = getDefaultWallets({
//     appName: "My RainbowKit App",
//     chains,
// });
const client = createClient({
    autoConnect: true,
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
    const sxBoxContent: SxProps = {
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "column", lg: "row" },
        width: "100%",
        height: "100%",
        //backgroundColor: "#121212",
    };
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

    return (
        <WagmiConfig client={client}>
            <ThemeProvider theme={theme}>
                <Box sx={{ backgroundColor: "#121212" }}>
                    <div className="background-image">
                        <HeaderLayout></HeaderLayout>
                        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
                            <Box sx={sxBoxContentMenu}>
                                <Box sx={sxBoxContent}>
                                    <UserLayout></UserLayout>
                                    <DexLayout></DexLayout>
                                </Box>
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
