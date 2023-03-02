import { Observable } from "rxjs";
import { ITokenContract } from "../smart-contracts/smart-contract-data";
import { ILiquidityAdded } from "../interfaces/ILiquidityAdded";
import { IRoleChanged } from "../interfaces/IRoleChanged";

export interface IBlockchainSubscriptions {
    LiquidityAdded$(): Observable<ILiquidityAdded>;
    Swapped$(): Observable<string>;
    TokenTransfered$(): Observable<ITokenContract>;
    MintRevertedPeriod$(): Observable<string>;
    RoleGranted$(): Observable<IRoleChanged>;
    RoleRevoked$(): Observable<IRoleChanged>;
    subscribeAll(): Promise<void>;
    subscribeTokensEvents(): Promise<void>;
    subscribePairEvents(): Promise<void>;
    subscribeRouterEvents(): Promise<void>;
}
