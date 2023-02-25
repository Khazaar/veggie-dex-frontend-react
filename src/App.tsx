import "./App.css";
import { SmartContractService } from "./services/smartContract.service";
import { ConnectService } from "./services/connect.service";
import { ThemeProvider } from "@mui/material/styles";
import { HeaderComponent } from "./layouts/header/header.component";
import { UserComponent } from "./layouts/user/user.component";
import { DexComponent } from "./layouts/dex/dex.component";
import { theme } from "./assets/styles/theme";
import { MenuComponent } from "./layouts/menu/menu.components";
import { createContext } from "react";

export const SmartContractServiceContext = createContext<SmartContractService>(
    new SmartContractService(new ConnectService())
);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="global-wrapper">
                <HeaderComponent></HeaderComponent>
                <div className="content-menu-wrapper">
                    <div className="content-wrapper">
                        <DexComponent></DexComponent>
                        <UserComponent></UserComponent>
                    </div>
                    <MenuComponent></MenuComponent>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
