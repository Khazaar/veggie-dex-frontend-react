import "./App.css";
import { SmartContractService } from "./services/smartContract.service";
import { ConnectService } from "./services/connect.service";
import { ThemeProvider } from "@mui/material/styles";
import { HeaderLayout } from "./layouts/header/header.layout";
import { UserLayout } from "./layouts/user/user.layout";
import { DexLayout } from "./layouts/dex/dex.layout";
import { theme } from "./assets/styles/theme";
import { MenuLayout } from "./layouts/menu/menu.layout";
import { createContext } from "react";
import { Box } from "@mui/material";

import { SxProps } from "@mui/system";

export const SmartContractServiceContext = createContext<SmartContractService>(
    new SmartContractService()
);

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
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: "#121212" }}>
                <div className="background-image">
                    <HeaderLayout></HeaderLayout>
                    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <Box sx={sxBoxContentMenu}>
                            <Box sx={sxBoxContent}>
                                <DexLayout></DexLayout>
                                <UserLayout></UserLayout>
                            </Box>
                            <MenuLayout></MenuLayout>
                        </Box>
                    </Box>
                </div>
            </Box>
        </ThemeProvider>
    );
}

export default App;
