import "./App.css";
import { SmartContractService } from "./services/smartContract.service";
import { ConnectService } from "./services/connect.service";
import { ThemeProvider } from "@mui/material/styles";
import { HeaderLayout } from "./layouts/header/header.layout";
import { UserLayout } from "./layouts/user/user.layout";
import { DexLayout } from "./layouts/dex/dex.layout";
import { theme } from "./assets/styles/theme";
import { MenuLayout } from "./layouts/menu/menu.layout";
import { createContext, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";

import { styled, SxProps } from "@mui/system";
import { renderToStaticMarkup } from "react-dom/server";
import backImage from "./assets/images/apple-bg.svg";

export const SmartContractServiceContext = createContext<SmartContractService>(
    new SmartContractService()
);

function App() {
    const sxBoxContent: SxProps = {
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "column", lg: "row" },
        width: "100%",
    };
    const svgString = encodeURIComponent(renderToStaticMarkup(backImage));
    const sxBoxContentMenu: SxProps = {
        display: "flex",
        flexDirection: {
            xs: "column-reverse",
            sm: "row",
            md: "row",
            lg: "row",
        },
        width: "100%",
        height: "100%",
        alignItems: {
            xs: "center",
            sm: "flex-start",
            md: "flex-start",
            lg: "flex-start",
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="global-wrapper">
                <HeaderLayout></HeaderLayout>
                <div className="background-image">
                    <Box sx={sxBoxContentMenu}>
                        <Box sx={sxBoxContent}>
                            <DexLayout></DexLayout>
                            <UserLayout></UserLayout>
                        </Box>
                        <MenuLayout></MenuLayout>
                    </Box>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
