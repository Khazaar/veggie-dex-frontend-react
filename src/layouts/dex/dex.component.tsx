import "./style.css";
import React from "react";

import { AddLiquidityComponent } from "../../components/addLiquidity/addLiquidity.component";

export const DexComponent = () => {
    return (
        <div className="DexComponent">
            <AddLiquidityComponent></AddLiquidityComponent>
        </div>
    );
};
