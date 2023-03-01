import { Observable } from "rxjs";
import { ITokenContract } from "../../smart-contracts/smart-contract-data";
import { ILiquidityAdded } from "./ILiquidityAdded";

export interface IBlockchainSubscriptions {
    LiquidityAdded$(): Observable<ILiquidityAdded>;
    Swapped$(): Observable<void>;
    TokenTransfered$(): Observable<ITokenContract>;
    MintRevertedPeriod$(): Observable<string>;
    AdminGranted$(): Observable<string>;
    AdminRevoked$(): Observable<string>;
    subscribeAll(): Promise<void>;
    subscribeTokensEvents(): Promise<void>;
    subscribePairEvents(): Promise<void>;
    subscribeRouterEvents(): Promise<void>;
}
