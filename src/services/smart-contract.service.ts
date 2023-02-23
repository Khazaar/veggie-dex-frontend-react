import { ethers } from "ethers";
import { min, Observable, Subject } from "rxjs";
import {
    IPair,
    ISmartContract,
    Pair,
    Potato,
} from "../smart-contracts/smart-contract-data";
//import ERC20Potato from "../smart-contracts/ERC20Potato.json";
import { ConnectService } from "./connect.service";
import { ISmartContractService } from "./ISmartContractService";

export class SmartContractService implements ISmartContractService {
    public tokenPairs: IPair[] = [];
    public network: keyof typeof Potato.address;
    public gasLimit = 50000;

    private liquidityAdded = new Subject<void>();
    public LiquidityAdded$(): Observable<void> {
        return this.liquidityAdded.asObservable();
    }
    private swapped = new Subject<void>();
    public Swapped$(): Observable<void> {
        return this.swapped.asObservable();
    }
    private tokenMinted = new Subject<ISmartContract>();
    public TokenMinted$(): Observable<ISmartContract> {
        return this.tokenMinted.asObservable();
    }

    private mintRevertedPeriod = new Subject<string>();
    public MintRevertedPeriod$(): Observable<string> {
        return this.mintRevertedPeriod.asObservable();
    }

    private adminGranted = new Subject<string>();
    public AdminGranted$(): Observable<string> {
        return this.adminGranted.asObservable();
    }

    private adminRevoked = new Subject<string>();
    public AdminRevoked$(): Observable<string> {
        return this.adminRevoked.asObservable();
    }

    constructor(public connectService: ConnectService) {}

    public async initSmartContractService() {
        try {
            await this.subscribeRouterContractsEvents();
            await this.subscribeMintRevertedPeriodEvent();
            await this.subscribeTransferTokensEvents();
            await this.subscribeTransferTokensEvents();
            await this.subscribeAdminEvents();
            this.updateSmatrContractServiceNetwork();
            await this.connectService.initConnectService();
        } catch (error) {
            console.log(
                `Error in initSmartContractService: ${(error as Error).message}`
            );
        }
    }

    public updateSmatrContractServiceNetwork() {
        this.network = this.connectService.network
            .nameShort as keyof typeof Potato.address;
    }

    public async mintTokens(contract: ethers.Contract, amount: BigInt) {
        //this.fetchSmartContract();

        await contract
            .connect(this.connectService.signer)
            .getTokens(amount.toString());
    }

    public async getTokensBalance(contract: ethers.Contract): Promise<BigInt> {
        //this.fetchSmartContract();

        return await contract
            .connect(this.connectService.signer)
            .balanceOf(await this.connectService.signer.getAddress());
    }
    public async getSignerBalance() {
        return ethers.utils.formatEther(
            await this.connectService.signer.getBalance()
        );
    }
    public async addLiquidity(
        contractA: ISmartContract,
        contractB: ISmartContract,
        amountA: BigInt,
        amountB: BigInt
    ) {
        this.updateSmatrContractServiceNetwork();
        let tx = await contractA.instance
            .connect(this.connectService.signer)
            .approve(
                this.connectService.contractRouter_mod.address,
                amountA.toString(),
                { gasLimit: this.gasLimit }
            );
        await tx.wait(1);
        tx = await contractB.instance
            .connect(this.connectService.signer)
            .approve(
                this.connectService.contractRouter_mod.address,
                amountB.toString(),
                { gasLimit: this.gasLimit }
            );
        await tx.wait(1);
        console.log(
            `Allowance A set to: ${await contractA.instance.allowance(
                this.connectService.signer.getAddress(),
                this.connectService.contractRouter_mod.address
            )}`
        );
        console.log(
            `Allowance B set to: ${await contractB.instance.allowance(
                this.connectService.signer.getAddress(),
                this.connectService.contractRouter_mod.address
            )}`
        );
        tx = await this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .addLiquidity(
                contractA.address[this.network],
                contractB.address[this.network],
                amountA.toString(),
                amountB.toString(),
                1,
                1,
                this.connectService.signer.getAddress(),
                216604939048
            );
        await tx.wait(1);
    }
    public async swap(
        contractA: ISmartContract,
        contractB: ISmartContract,
        amountA: BigInt,
        amountB: BigInt
    ) {
        this.updateSmatrContractServiceNetwork();
        let tx = await contractA.instance
            .connect(this.connectService.signer)
            .approve(
                this.connectService.contractRouter_mod.address,
                amountA.toString()
            );
        await tx.wait(1);
        console.log(
            `Allowance A set to: ${await contractA.instance.allowance(
                this.connectService.signer.getAddress(),
                this.connectService.contractRouter_mod.address
            )}`
        );

        tx = await this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .swapExactTokensForTokens(
                amountA.toString(),
                1,
                [
                    contractA.address[this.network],
                    contractB.address[this.network],
                ],
                this.connectService.signer.getAddress(),
                99999999999999
            );
        await tx.wait(1);
        await this.subscribePairEvents();
    }
    public getIContractByAddress(address: string): Promise<ISmartContract> {
        return new Promise((resolve, reject) => {
            this.connectService
                .getTokenContracts()
                .forEach((contract: ISmartContract) => {
                    if (
                        contract.address[this.network].toLowerCase() == address
                    ) {
                        resolve(contract);
                        return;
                    }
                });
            reject();
        });
    }
    public async getPairs(): Promise<IPair[]> {
        this.updateSmatrContractServiceNetwork();
        this.connectService.fetchSmartContracts();
        const nPairs =
            await this.connectService.contractFactory.allPairsLength();
        const tokenPairs: IPair[] = [];
        for (let i = 0; i < nPairs; i++) {
            try {
                const pairAddress =
                    await this.connectService.contractFactory.allPairs(i);

                const contractPair = new ethers.Contract(
                    pairAddress,
                    Pair.abi as any,
                    this.connectService.signer
                );
                const token0Address = (
                    await contractPair.token0()
                ).toLowerCase();
                const token1Address = (
                    await contractPair.token1()
                ).toLowerCase();
                const token0: ISmartContract = await this.getIContractByAddress(
                    token0Address
                );
                const token1: ISmartContract = await this.getIContractByAddress(
                    token1Address
                );
                const [reserve0, reserve1, time] =
                    await contractPair.getReserves();
                const pair: IPair = {
                    name: `${token0.nameShort}/${token1.nameShort}`,
                    address: pairAddress,
                    abi: Pair.abi,
                    instance: contractPair,
                    token0: token0,
                    token1: token1,
                    reserve0: reserve0,
                    reserve1: reserve1,
                };
                tokenPairs.push(pair);
            } catch (error) {
                console.log(error);
            }
        }
        this.tokenPairs = tokenPairs;
        return tokenPairs;
    }

    public async addAdminAddress(adminRoleAddress: string) {
        try {
            if (ethers.utils.isAddress(adminRoleAddress)) {
                let tx =
                    await this.connectService.contractRouter_mod.addAdminAddress(
                        adminRoleAddress
                    );
                tx.wait(1);
            } else {
                throw new Error("Invalid address");
            }
        } catch (error) {
            console.log(error);
        }
    }
    public async revokeAdminAddress(adminRoleAddress: string) {
        try {
            if (ethers.utils.isAddress(adminRoleAddress)) {
                let tx =
                    await this.connectService.contractRouter_mod.revokeAdminAddress(
                        adminRoleAddress
                    );
                tx.wait(1);
            } else {
                throw new Error("Invalid address");
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async withdrawFees() {
        try {
            this.connectService.tokenContracts.forEach(async (iContract) => {
                if (
                    (await iContract.instance.balanceOf(
                        this.connectService.contractRouter_mod.address
                    )) > 0
                ) {
                    await this.connectService.contractRouter_mod.withdrawFees(
                        iContract.instance.address
                    );
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    public async subscribePairEvents() {
        const pairs = await this.getPairs();
        pairs.forEach((iPair) => {
            iPair.instance.removeAllListeners();
            iPair.instance.on("Swap", (amountA, amountB) => {
                console.log(
                    `Added liquidity to ${iPair.name}: amoint A ${amountA}, amountB ${amountB}`
                );
                this.swapped.next();
            });
        });
    }

    public async subscribeRouterContractsEvents() {
        this.connectService.contractRouter_mod.removeAllListeners();
        this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .on(
                "AddLiquidity",
                (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
                    console.log(
                        `Added liquidity: sender ${sender}, amount0In ${amount0In}, amount1In ${amount1In}, amount0Out ${amount0Out}, amount1Out ${amount1Out}, to ${to}`
                    );
                    this.liquidityAdded.next();
                }
            );
    }
    public async subscribeTransferTokensEvents() {
        this.connectService.tokenContracts.forEach((iContract) => {
            iContract.instance.removeAllListeners();
            iContract.instance
                .connect(this.connectService.signer)
                .on("Transfer", (from, to, amount) => {
                    console.log(
                        `Transfeed ${amount} tokens from ${from} to ${to}`
                    );
                    this.tokenMinted.next(iContract);
                });
        });
    }

    //!!! FIX only for apple
    public async subscribeMintRevertedPeriodEvent() {
        this.connectService.contractApple.on(
            "MintRevertedPeriod",
            (timePassedSeconds, mintLimitPeriodSeconds) => {
                const err = `Passed only ${timePassedSeconds} seconds, required to wait ${mintLimitPeriodSeconds} seconds`;
                console.log(err);
                this.mintRevertedPeriod.next(err);
            }
        );
    }

    public async subscribeAdminEvents() {
        this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .on("RoleGranted", (role, account) => {
                console.log(`Role ${role} granted to ${account}`);
                this.adminGranted.next(account);
            });

        this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .on("RoleRevoked", (role, account) => {
                console.log(`Role ${role} revoked from ${account}`);
                this.adminRevoked.next(account);
            });
    }
}
