import { BlockchainSubscriptions } from "./blockchainSubscriptions.service";
import { BigNumber, ethers } from "ethers";
import {
    IPair,
    Potato,
    ITokenContract,
} from "../smart-contracts/smart-contract-data";
import { IConnectService } from "./IConnect.service";
import { ERC20Basic } from "../smart-contracts/types";
import { Subject, Observable } from "rxjs";
import { INetwork } from "../smart-contracts/networks";

export interface ISmartContractService {
    tokenPairs: IPair[];
    gasLimit: number;
    connectService: IConnectService;
    blockchainSubscriptions: BlockchainSubscriptions;
    hasAdminRole: boolean;
    hasOwnerRole: boolean;
    roleUpdated: Subject<void>;
    RoleUpdated$(): Observable<void>;
    DexInited$(): Observable<void>;

    initSmartContractService(): Promise<void>;
    mintTokens(contract: ERC20Basic, amount: BigNumber): Promise<void>;
    getTokensBalance(contract: ERC20Basic): Promise<BigNumber>;
    addLiquidity(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        amountA: BigNumber,
        amountB: BigNumber
    ): Promise<void>;
    swap(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        amountA: BigNumber
    ): Promise<void>;
    getIContractByAddress(address: string): Promise<ITokenContract>;
    getPairs(): Promise<IPair[]>;
}
