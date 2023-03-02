import "./style.css";
import { AddLiquidityComponent } from "../../components/addLiquidity/addLiquidity.component";
import { SwapComponent } from "../../components/swap/swap.component";
import { LiquidityPoolsComponent } from "../../components/liquidityPools/liquidityPools.component";

export const DexLayout = () => {
    return (
        <div className="DexComponent">
            <AddLiquidityComponent></AddLiquidityComponent>
            <SwapComponent></SwapComponent>
            <LiquidityPoolsComponent></LiquidityPoolsComponent>
        </div>
    );
};
