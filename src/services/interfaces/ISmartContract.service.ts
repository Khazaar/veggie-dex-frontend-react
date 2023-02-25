import { BlockchainSubscriptions } from "../blockchainSubscriptions.service";
import { ethers } from "ethers";
import {
    IPair,
    Potato,
    ISmartContract,
} from "../../smart-contracts/smart-contract-data";
import { IConnectService } from "./IConnect.service";

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
    mintTokens(contract: ethers.Contract, amount: BigInt): Promise<void>;
    getTokensBalance(contract: ethers.Contract): Promise<BigInt>;
    getSignerBalance(): Promise<string>;
    addLiquidity(
        contractA: ISmartContract,
        contractB: ISmartContract,
        amountA: BigInt,
        amountB: BigInt
    ): Promise<void>;
    swap(
        contractA: ISmartContract,
        contractB: ISmartContract,
        amountA: BigInt,
        amountB: BigInt
    ): Promise<void>;
    getIContractByAddress(address: string): Promise<ISmartContract>;
    getPairs(): Promise<IPair[]>;
}
