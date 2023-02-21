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
                    borderRadius: 40,
                    backgroundColor: "transparent",
                    border: `3px solid ${colorGreenLight}`,
                    width: "400px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: "12px",
                    padding: "12px",
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: colorGreenLight,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    margin: "0px",
                    padding: "6px 0px 0px 0px",
                    fontSize: "2.5rem",
                },
            },
        },

        MuiCardContent: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",

                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: "0",
                    padding: "0",
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

    typography: {
        h4: {
            color: colorGreenLight,
            fontSize: "1.5rem",
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
