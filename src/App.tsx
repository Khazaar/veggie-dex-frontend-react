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
                    borderRadius: 16,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    backgroundColor: "transparent",
                    border: `3px solid ${colorGreenLight}`,
                    width: "400px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",

                    marginTop: "12px",
                    padding: "0",
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
                    padding: "0 0 0 0",
                    "&:last-child": {
                        paddingBottom: 10,
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    textTransform: "uppercase",
                    backgroundColor: "white",
                    m: 0,
                    width: "100%",
                    p: 1,
                    borderRadius: 10,

                    "& .MuiSelect-notchedOutline": {
                        borderColor: "blue",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "red",
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    textTransform: "uppercase",
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
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
