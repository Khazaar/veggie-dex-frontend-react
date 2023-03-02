import { BigNumber } from "ethers";

export interface ITokenAsset {
    position: number;
    name: string;
    amount: BigNumber;
}
