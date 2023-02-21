import React from "react";
import "./App.css";
import { SmartContractService } from "./services/smart-contract.service";
import { ConnectService } from "./services/connect.service";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import { HeaderComponent } from "./layouts/header/header.component";
import { UserComponent } from "./layouts/user/user.component";
import { DexComponent } from "./layouts/dex/dex.component";

export const SmartContractServiceContext =
    React.createContext<SmartContractService>(
        new SmartContractService(new ConnectService())
    );

const colorGreenLight = "#1aba00";
const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    backgroundColor: "transparent",
                    border: `2px solid ${colorGreenLight}`,
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: colorGreenLight,
                    textTransform: "uppercase",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: "white",
                },
            },
        },
    },

    palette: {
        primary: {
            main: red[500],
        },
    },
    typography: {
        h4: {
            color: colorGreenLight,
        },
    },
});
function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="global-wrapper">
                <HeaderComponent></HeaderComponent>
                <div className="content-wrapper">
                    <DexComponent></DexComponent>
                    <UserComponent></UserComponent>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
