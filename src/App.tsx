import React from "react";
import "./App.css";
import { SmartContractService } from "./services/smart-contract.service";
import { ConnectService } from "./services/connect.service";
import { ConnectWalletComponent } from "./components/connectWallet/content.component";

export const SmartContractServiceContext =
    React.createContext<SmartContractService>(
        new SmartContractService(new ConnectService())
    );

function App() {
    return (
        <div className="App">
            <ConnectWalletComponent></ConnectWalletComponent>
        </div>
    );
}

export default App;
