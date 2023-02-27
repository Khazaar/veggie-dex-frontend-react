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

export const SmartContractServiceContext = createContext<SmartContractService>(
    new SmartContractService(new ConnectService())
);

export const IsLoading = createContext<boolean>(false);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="global-wrapper">
                <HeaderLayout></HeaderLayout>
                <div className="content-menu-wrapper">
                    <div className="content-wrapper">
                        <DexLayout></DexLayout>
                        <UserLayout></UserLayout>
                    </div>
                    <MenuLayout></MenuLayout>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
