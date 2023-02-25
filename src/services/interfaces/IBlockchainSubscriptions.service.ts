import { Observable } from "rxjs";
import { ISmartContract } from "../../smart-contracts/smart-contract-data";

export interface IBlockchainSubscriptions {
    LiquidityAdded$(): Observable<void>;
    Swapped$(): Observable<void>;
    TokenTransfered$(): Observable<ISmartContract>;
    MintRevertedPeriod$(): Observable<string>;
    AdminGranted$(): Observable<string>;
    AdminRevoked$(): Observable<string>;
    subscribeAll(): Promise<void>;
    subscribeTokensEvents(): Promise<void>;
    subscribePairEvents(): Promise<void>;
    subscribeRouterEvents(): Promise<void>;
}
