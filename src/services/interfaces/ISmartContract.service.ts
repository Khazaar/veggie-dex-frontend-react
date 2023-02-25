import { BlockchainSubscriptions } from "../blockchainSubscriptions.service";
import { ethers } from "ethers";
import {
    IPair,
    Potato,
    ITokenContract,
} from "../../smart-contracts/smart-contract-data";
import { IConnectService } from "./IConnect.service";
import { ERC20Basic } from "../../smart-contracts/types";

export interface ISmartContractService {
    tokenPairs: IPair[];
    network: keyof typeof Potato.address;
    gasLimit: number;
    connectService: IConnectService;
    blockchainSubscriptions: BlockchainSubscriptions;
    hasAdminRole: boolean;
    hasOwnerRole: boolean;

    initSmartContractService(): Promise<void>;
    updateSmatrContractServiceNetwork(): void;
    mintTokens(contract: ERC20Basic, amount: BigInt): Promise<void>;
    getTokensBalance(contract: ERC20Basic): Promise<BigInt>;
    getSignerBalance(): Promise<string>;
    addLiquidity(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        amountA: BigInt,
        amountB: BigInt
    ): Promise<void>;
    swap(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        amountA: BigInt
    ): Promise<void>;
    getIContractByAddress(address: string): Promise<ITokenContract>;
    getPairs(): Promise<IPair[]>;
}
