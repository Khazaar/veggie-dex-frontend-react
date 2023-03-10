import { ethers, Signer } from "ethers";
import { Observable } from "rxjs";
import { INetwork } from "../smart-contracts/networks";
import { ITokenContract } from "../smart-contracts/smart-contract-data";
import {
    ERC20Potato,
    ERC20Apple,
    ERC20Tomato,
    ERC20LSR,
    PancakeFactory,
    PancakePair,
    PancakeRouter_mod,
} from "../smart-contracts/types";

export interface IConnectService {
    ADMIN_ROLE: string;
    contractPotato: ERC20Potato;
    contractApple: ERC20Apple;
    contractTomato: ERC20Tomato;
    contractLSR: ERC20LSR;
    contractFactory: PancakeFactory;
    contractPair: PancakePair;
    contractRouter_mod: PancakeRouter_mod;
    tokenContracts: ITokenContract[];
    network: INetwork;
    defaultNetwork: INetwork;
    provider: any;
    signer: any;
    walletConnected: Observable<string>;
    walletConnected$(): Observable<string>;
    initConnectService(signer: Signer): Promise<void>;
    setNetwork(network: INetwork): void;
    getTokenContracts(): ITokenContract[];
    fetchSmartContracts(): Promise<void>;
    getSignerBalance(): Promise<string>;
}
