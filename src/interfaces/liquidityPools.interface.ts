import { BigNumber } from "ethers";

export interface ILiquidityPools {
    position: number;
    pairName: string;
    reserve0: BigNumber;
    reserve1: BigNumber;
}
