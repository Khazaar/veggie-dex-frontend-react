import "./style.css";
import React from "react";

import { AddLiquidityComponent } from "../../components/addLiquidity/addLiquidity.component";
import { SwapComponent } from "../../components/swap/swap.component";

export const DexComponent = () => {
    return (
        <div className="DexComponent">
            <AddLiquidityComponent></AddLiquidityComponent>
            <SwapComponent></SwapComponent>
        </div>
    );
};
