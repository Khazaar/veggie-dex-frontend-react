import "./style.css";
import { UserAssetsComponent } from "../../components/userAssets/userAssets.component";
import { MintTokensComponent } from "../../components/mintTokens/mintTokens.component";
import { AdminPanelComponent } from "../../components/adminPanel/adminPanel.component";
import { SmartContractServiceContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useRefresh } from "../../hooks/useRefresh";
import { RemoveLiquidityComponent } from "../../components/removeLiquidity/removeLiquidity.component";

export const UserComponent = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const smartContractService = useContext(SmartContractServiceContext);

    const fetchData = async () => {
        setIsAdmin(smartContractService.connectService.hasAdminRole);
        setIsOwner(smartContractService.connectService.hasOwnerRole);
    };

    useRefresh(smartContractService, fetchData);
    return (
        <div className="UserComponent">
            <div>
                <MintTokensComponent></MintTokensComponent>
                <UserAssetsComponent></UserAssetsComponent>
                <RemoveLiquidityComponent></RemoveLiquidityComponent>
                {isAdmin && <AdminPanelComponent></AdminPanelComponent>}
            </div>
        </div>
    );
};
