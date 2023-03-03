import { BSC } from "./../smart-contracts/networks";
import { ERC20Basic } from "./../smart-contracts/types/ERC20Basic";
import { ethers } from "ethers";
import { Observable } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import { Hardhat, INetwork } from "../smart-contracts/networks";
import {
    Potato,
    Apple,
    LSR,
    ITokenContract,
    Factory,
    Router_mod,
    Tomato,
    IAddress,
} from "../smart-contracts/smart-contract-data";
import {
    ERC20Apple,
    ERC20Apple__factory,
    ERC20LSR,
    ERC20LSR__factory,
    ERC20Potato,
    ERC20Potato__factory,
    ERC20Tomato,
    ERC20Tomato__factory,
    PancakeFactory,
    PancakeFactory__factory,
    PancakePair,
    PancakeRouter_mod,
    PancakeRouter_mod__factory,
} from "../smart-contracts/types";
import { IConnectService } from "./IConnect.service";

export class ConnectService implements IConnectService {
    public ADMIN_ROLE = ethers.utils.solidityKeccak256(["string"], ["ADMIN"]);
    public contractPotato: ERC20Potato;
    public contractApple: ERC20Apple;
    public contractTomato: ERC20Tomato;
    public contractLSR: ERC20LSR;
    public contractFactory: PancakeFactory;
    public contractPair: PancakePair;
    public contractRouter_mod: PancakeRouter_mod;
    public tokenContracts: ITokenContract[] = [];
    public network: INetwork;
    public defaultNetwork = BSC;
    public provider: ethers.providers.Web3Provider;
    public signer: ethers.providers.JsonRpcSigner;
    public walletConnected = new Subject<string>();
    public walletConnected$(): Observable<string> {
        return this.walletConnected.asObservable();
    }

    constructor() {}

    public async initConnectService() {
        try {
            await (window as any).ethereum.request({
                method: "eth_requestAccounts",
            });
            this.provider = new ethers.providers.Web3Provider(
                (window as any).ethereum
            );
            this.signer = await this.provider.getSigner();
            this.network = this.defaultNetwork;

            await this.fetchSmartContracts();
            this.walletConnected.next(await this.signer.getAddress());

            //this.walletConnected.next();
        } catch (error) {
            console.log(
                `Error in initConnectService: ${(error as Error).message}`
            );
        }
    }

    public async setNetwork(network: INetwork) {
        this.network = network;
        await this.fetchSmartContracts();
    }

    public getTokenContracts() {
        return this.tokenContracts;
    }
    public async fetchSmartContracts() {
        try {
            const network = this.network.nameShort as keyof IAddress;

            // Apple
            this.contractApple = ERC20Apple__factory.connect(
                Apple.address[network],
                this.signer
            );
            Apple.instance = this.contractApple;

            // Potato
            this.contractPotato = ERC20Potato__factory.connect(
                Potato.address[network],
                this.signer
            );
            Potato.instance = this.contractPotato;

            // Tomato
            this.contractTomato = ERC20Tomato__factory.connect(
                Tomato.address[network],
                this.signer
            );
            Tomato.instance = this.contractTomato;

            // LSR
            this.contractLSR = ERC20LSR__factory.connect(
                LSR.address[network],
                this.signer
            );
            LSR.instance = this.contractLSR;
            // Factory
            this.contractFactory = PancakeFactory__factory.connect(
                Factory.address[network],
                this.signer
            );

            this.contractRouter_mod = PancakeRouter_mod__factory.connect(
                Router_mod.address[network],
                this.signer
            );
            this.tokenContracts = [Apple, Potato, Tomato, LSR];
        } catch (error) {
            console.log(
                `Error in fetchSmartContracts: ${(error as Error).message}`
            );
        }
    }
    public async getSignerBalance() {
        return ethers.utils.formatEther(await this.signer.getBalance());
    }
}
