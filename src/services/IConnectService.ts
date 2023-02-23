import { ethers } from "ethers";
import { Observable } from "rxjs";
import { INetwork } from "../smart-contracts/networks";
import { ISmartContract } from "../smart-contracts/smart-contract-data";

export interface IConnectService {
    ADMIN_ROLE: string;
    contractPotato: ethers.Contract;
    contractApple: ethers.Contract;
    contractTomato: ethers.Contract;
    contractLSR: ethers.Contract;
    contractFactory: ethers.Contract;
    contractPair: ethers.Contract;
    contractRouter_mod: ethers.Contract;
    tokenContracts: ISmartContract[];
    network: INetwork;
    defaultNetwork: INetwork;
    hasAdminRole: boolean;
    hasOwnerRole: boolean;
    tokenMinted: Observable<ISmartContract>;
    provider: ethers.providers.Web3Provider;
    signer: ethers.providers.JsonRpcSigner;
    isConnected: boolean;
    walletConnected: Observable<void>;
    walletConnected$(): Observable<void>;
    initConnectService(): Promise<void>;
    setNetwork(network: INetwork): void;
    getTokenContracts(): ISmartContract[];
    fetchSmartContracts(): Promise<void>;
    getSignerBalance(): Promise<string>;
    getRouterAdmins(): Promise<string[]>;
}
