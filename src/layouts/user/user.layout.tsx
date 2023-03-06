import "./style.css";
import { UserAssetsComponent } from "../../components/userAssets/userAssets.component";
import { MintTokensComponent } from "../../components/mintTokens/mintTokens.component";
import { AdminPanelComponent } from "../../components/adminPanel/adminPanel.component";
import { SmartContractServiceContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { RemoveLiquidityComponent } from "../../components/removeLiquidity/removeLiquidity.component";
import { OwnerPanelComponent } from "../../components/ownerPanel/ownerPanel.component";
import { useRoleUpdatedSubscription } from "../../hooks/useRoleUpdatedSubscription";

export const UserLayout = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const smartContractService = useContext(SmartContractServiceContext);

    const fetchData = async () => {
        setIsAdmin(smartContractService.hasAdminRole);
        setIsOwner(smartContractService.hasOwnerRole);
    };

    useRoleUpdatedSubscription(smartContractService, fetchData);
    return (
        <div className="UserComponent">
            <div>
                <MintTokensComponent></MintTokensComponent>
                <UserAssetsComponent></UserAssetsComponent>
                <RemoveLiquidityComponent></RemoveLiquidityComponent>
                {isAdmin && <AdminPanelComponent></AdminPanelComponent>}
                {isOwner && <OwnerPanelComponent></OwnerPanelComponent>}
            </div>
        </div>
    );
};
