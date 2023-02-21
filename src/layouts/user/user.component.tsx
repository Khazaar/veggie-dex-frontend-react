import "./style.css";
import { UserAssetsComponent } from "../../components/userAssets/userAssets.component";
import { MintTokensComponent } from "../../components/mintTokens/mintTokens.component";

export const UserComponent = () => {
    return (
        <div className="UserComponent">
            <div>
                <MintTokensComponent></MintTokensComponent>
                <UserAssetsComponent></UserAssetsComponent>
            </div>
        </div>
    );
};
