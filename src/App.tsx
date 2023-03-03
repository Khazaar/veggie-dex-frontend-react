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

export const SmartContractServiceContext = createContext<SmartContractService>(
    new SmartContractService()
);

function App() {
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const sxBoxContent: SxProps = {
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "column", lg: "row" },
        width: "100%",
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="global-wrapper">
                <HeaderLayout></HeaderLayout>
                <div className="content-menu-wrapper">
                    <Box sx={sxBoxContent}>
                        <DexLayout></DexLayout>
                        <UserLayout></UserLayout>
                    </Box>
                    <MenuLayout></MenuLayout>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
