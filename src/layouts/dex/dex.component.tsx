import "./style.css";
import React from "react";

import { AddLiquidityComponent } from "../../components/addLiquidity/addLiquidity.component";
import { SwapComponent } from "../../components/swap/swap.component";
import { LiquidityPoolsComponent } from "../../components/liquidityPools/liquidityPools.component";

export const DexComponent = () => {
    return (
        <div className="DexComponent">
            <AddLiquidityComponent></AddLiquidityComponent>
            <SwapComponent></SwapComponent>
            <LiquidityPoolsComponent></LiquidityPoolsComponent>
        </div>
    );
};
