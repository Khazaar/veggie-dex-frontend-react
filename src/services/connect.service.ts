import { ethers } from "ethers";
import { Observable } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import { Hardhat, INetwork } from "../smart-contracts/networks";
import {
    Potato,
    Apple,
    LSR,
    ISmartContract,
    Factory,
    Router_mod,
    Tomato,
} from "../smart-contracts/smart-contract-data";
import { IConnectService } from "./IConnectService";

export class ConnectService implements IConnectService {
    public ADMIN_ROLE = ethers.utils.solidityKeccak256(["string"], ["ADMIN"]);
    public contractPotato: ethers.Contract;
    public contractApple: ethers.Contract;
    public contractTomato: ethers.Contract;
    public contractLSR: ethers.Contract;
    public contractFactory: ethers.Contract;
    public contractPair: ethers.Contract;
    public contractRouter_mod: ethers.Contract;
    public tokenContracts: ISmartContract[] = [];
    public network: INetwork;
    public defaultNetwork = Hardhat;
    public hasAdminRole = false;
    public hasOwnerRole = false;
    public tokenMinted = new Subject<ISmartContract>();

    public provider: ethers.providers.Web3Provider;
    public signer: ethers.providers.JsonRpcSigner;
    public isConnected: boolean = false;

    public walletConnected = new Subject<void>();
    public walletConnected$(): Observable<void> {
        return this.walletConnected.asObservable();
    }

    public async initConnectService() {
        try {
            await (window as any).ethereum.request({
                method: "eth_requestAccounts",
            });
            this.provider = new ethers.providers.Web3Provider(
                (window as any).ethereum
            );
            this.signer = this.provider.getSigner();
            this.network = this.defaultNetwork;
            await this.fetchSmartContracts();
            console.log(`Is connected? ${this.isConnected}`);
            console.log("Account:", await this.signer.getAddress());
            if (
                (await this.getRouterAdmins()).includes(
                    await this.signer.getAddress()
                )
            ) {
                this.hasAdminRole = true;
                console.log("Admin detected...");
            } else {
                this.hasAdminRole = false;
            }

            if (
                (await this.signer.getAddress()) ==
                (await Router_mod.instance.getOwnerAddress())
            ) {
                this.hasOwnerRole = true;
                console.log("Owner detected...");
            } else {
                this.hasOwnerRole = false;
            }

            this.walletConnected.next();
        } catch (error) {
            console.log(
                `Error in initConnectService: ${(error as Error).message}`
            );
        }
    }

    public setNetwork(network: INetwork) {
        this.network = network;
        this.fetchSmartContracts();
    }

    public getTokenContracts() {
        return this.tokenContracts;
    }
    public async fetchSmartContracts() {
        try {
            const network = this.network
                .nameShort as keyof typeof Potato.address;

            // Potato
            this.contractPotato = new ethers.Contract(
                Potato.address[network],
                Potato.abi as any,
                this.signer
            );
            Potato.instance = this.contractPotato;

            // Tomato
            this.contractTomato = new ethers.Contract(
                Tomato.address[network],
                Tomato.abi as any,
                this.signer
            );
            Tomato.instance = this.contractTomato;

            // Apple
            this.contractApple = new ethers.Contract(
                Apple.address[network],
                Apple.abi as any,
                this.signer
            );
            Apple.instance = this.contractApple;
            // LSR
            this.contractLSR = new ethers.Contract(
                LSR.address[network],
                LSR.abi as any,
                this.signer
            );
            LSR.instance = this.contractLSR;
            // Factory
            this.contractFactory = new ethers.Contract(
                Factory.address[network],
                Factory.abi as any,
                this.signer
            );
            Factory.instance = this.contractFactory;

            this.contractRouter_mod = new ethers.Contract(
                Router_mod.address[network],
                Router_mod.abi as any,
                this.signer
            );
            Router_mod.instance = this.contractRouter_mod;
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

    public async getRouterAdmins() {
        const admins: string[] = [];
        try {
            let adminCount = (
                await this.contractRouter_mod.getRoleMemberCount(
                    this.ADMIN_ROLE
                )
            ).toNumber();
            for (let i = 0; i < adminCount; ++i) {
                admins.push(
                    await this.contractRouter_mod.getRoleMember(
                        this.ADMIN_ROLE,
                        i
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
        return admins;
    }
}
