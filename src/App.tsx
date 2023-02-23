import React, { useContext, useEffect } from "react";
import "./App.css";
import { SmartContractService } from "./services/smart-contract.service";
import { ConnectService } from "./services/connect.service";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HeaderComponent } from "./layouts/header/header.component";
import { UserComponent } from "./layouts/user/user.component";
import { DexComponent } from "./layouts/dex/dex.component";

export const SmartContractServiceContext =
    React.createContext<SmartContractService>(
        new SmartContractService(new ConnectService())
    );
//export const UpdateContext = React.createContext<boolean>(flag);

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
                    width: "100%",
                    borderRadius: "10px",
                    "& .MuiFilledInput-underline:after": {
                        borderBottomColor: colorGreenLight,
                        margin: "0 8px 0 8px",
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
                    "& .MuiFilledInput-underline:after": {
                        borderBottomColor: colorGreenLight,
                        margin: "0 8px 0 8px",
                    },
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": { color: "green" },
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
    const smartContractService = useContext(SmartContractServiceContext);
    //const update = useContext(UpdateContext);
    // useEffect(() => {
    //     smartContractService.TokenMinted$().subscribe(() => {
    //         console.log("TokenMinted$");
    //         smartContractService.upd = !smartContractService.upd;
    //     });
    // });
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
