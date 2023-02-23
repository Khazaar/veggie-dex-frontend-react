import "./style.css";
import { UserAssetsComponent } from "../../components/userAssets/userAssets.component";
import { MintTokensComponent } from "../../components/mintTokens/mintTokens.component";
import { AdminPanelComponent } from "../../components/adminPanel/adminPanel.component";
import { SmartContractServiceContext } from "../../App";
import { useContext, useEffect } from "react";
import { useRefresh } from "../../hooks/useRefresh";

export const UserComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);

    const fetchData = async () => {
        //await smartContractService.initSmartContractService();
    };
    // useEffect(() => {
    //     fetchData().catch((e) => console.log(e));
    // });

    useRefresh(smartContractService, fetchData);
    return (
        <div className="UserComponent">
            <div>
                <MintTokensComponent></MintTokensComponent>
                <UserAssetsComponent></UserAssetsComponent>
                {smartContractService.connectService.hasAdminRole && (
                    <AdminPanelComponent></AdminPanelComponent>
                )}
            </div>
        </div>
    );
};
