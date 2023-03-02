import { PancakePair__factory } from "../smart-contracts/types/factories";
import { BigNumber, ethers } from "ethers";
import {
    IPair,
    ITokenContract,
    Potato,
} from "../smart-contracts/smart-contract-data";
import { BlockchainSubscriptions } from "./blockchainSubscriptions.service";
import { ConnectService } from "./connect.service";
import { ISmartContractService } from "./ISmartContract.service";
import { ERC20Basic, PancakePair } from "../smart-contracts/types";
import { Hardhat } from "../smart-contracts/networks";
import { Observable, Subject } from "rxjs";

export class SmartContractService implements ISmartContractService {
    public tokenPairs: IPair[] = [];
    public network: keyof typeof Potato.address;
    public gasLimit = 50000;
    public blockchainSubscriptions: BlockchainSubscriptions;
    public hasAdminRole = false;
    public hasOwnerRole = false;
    public roleUpdated = new Subject<void>();
    public dexInited = new Subject<void>();
    public RoleUpdated$(): Observable<void> {
        return this.roleUpdated.asObservable();
    }
    public DexInited$(): Observable<void> {
        return this.dexInited.asObservable();
    }

    constructor(public connectService: ConnectService) {
        this.blockchainSubscriptions = new BlockchainSubscriptions(this);
    }

    public async initSmartContractService() {
        try {
            await this.connectService.initConnectService();
            this.updateSmatrContractServiceNetwork();
            //await this.blockchainSubscriptions.unsubscribeAll();
            await this.blockchainSubscriptions.subscribeAll();
            await this.updateAdminOwnerRole();
            this.dexInited.next();
        } catch (error) {
            console.log(
                `Error in initSmartContractService: ${(error as Error).message}`
            );
        }
    }

    public async updateAdminOwnerRole() {
        if (
            (await this.getRouterAdmins()).includes(
                await this.connectService.signer.getAddress()
            )
        ) {
            this.hasAdminRole = true;
            console.log("Admin detected...");
        } else {
            this.hasAdminRole = false;
        }

        if (
            (await this.connectService.signer.getAddress()) ===
            (await this.connectService.contractRouter_mod.getOwnerAddress())
        ) {
            this.hasOwnerRole = true;
            console.log("Owner detected...");
        } else {
            this.hasOwnerRole = false;
        }
        this.roleUpdated.next();
    }

    public updateSmatrContractServiceNetwork() {
        this.network = this.connectService.network
            .nameShort as keyof typeof Potato.address;
    }

    public async mintTokens(contract: ERC20Basic, amount: BigNumber) {
        //this.fetchSmartContract();

        //await contract.getTokens(amount.toString());
        await contract.getTokens(amount);
    }

    public async getTokensBalance(contract: ERC20Basic): Promise<BigNumber> {
        //this.fetchSmartContract();

        return await contract.balanceOf(
            await this.connectService.signer.getAddress()
        );
    }
    public async addLiquidity(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        amountA: BigNumber,
        amountB: BigNumber
    ) {
        this.updateSmatrContractServiceNetwork();
        let tx = await contractA.approve(
            this.connectService.contractRouter_mod.address,
            amountA.toString(),
            { gasLimit: this.gasLimit }
        );
        await this.smartWait(tx);
        tx = await contractB.approve(
            this.connectService.contractRouter_mod.address,
            amountB.toString(),
            { gasLimit: this.gasLimit }
        );
        await this.smartWait(tx);
        console.log(
            `Allowance A set to: ${await contractA.allowance(
                this.connectService.signer.getAddress(),
                this.connectService.contractRouter_mod.address
            )}`
        );
        console.log(
            `Allowance B set to: ${await contractB.allowance(
                this.connectService.signer.getAddress(),
                this.connectService.contractRouter_mod.address
            )}`
        );
        tx = await this.connectService.contractRouter_mod.addLiquidity(
            await contractA.address,
            await contractB.address,
            amountA,
            amountB,
            1,
            1,
            await this.connectService.signer.getAddress(),
            216604939048
        );
        await this.smartWait(tx);
    }

    public async removeLiquidity(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        liquidity: BigNumber
    ) {
        this.updateSmatrContractServiceNetwork();
        const pairAddress = await this.connectService.contractFactory.getPair(
            await contractA.address,
            await contractB.address
        );

        const contractPair = PancakePair__factory.connect(
            pairAddress,
            this.connectService.signer
        );

        // Approve to remove liquidity
        await contractPair.approve(
            await this.connectService.contractRouter_mod.address,
            liquidity
        );
        let tx = await this.connectService.contractRouter_mod.removeLiquidity(
            await contractA.address,
            await contractB.address,
            liquidity.toString(),
            1,
            1,
            await this.connectService.signer.getAddress(),
            2166049390489
        );

        await this.smartWait(tx);
    }

    public async getLiquidityAvailable(
        contractPair: PancakePair
    ): Promise<BigNumber> {
        return await contractPair.balanceOf(
            await this.connectService.signer.getAddress()
        );
    }

    public async swap(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        amountA: BigNumber
    ) {
        this.updateSmatrContractServiceNetwork();
        let tx = await contractA.approve(
            await this.connectService.contractRouter_mod.address,
            amountA.toString()
        );
        await this.smartWait(tx);
        console.log(
            `Allowance A set to: ${await contractA.allowance(
                this.connectService.signer.getAddress(),
                await this.connectService.contractRouter_mod.address
            )}`
        );

        tx =
            await this.connectService.contractRouter_mod.swapExactTokensForTokens(
                amountA.toString(),
                1,
                [await contractA.address, await contractB.address],
                this.connectService.signer.getAddress(),
                99999999999999
            );
        await this.smartWait(tx);
        //await this.subscribePairEvents();
    }
    public getIContractByAddress(address: string): Promise<ITokenContract> {
        return new Promise((resolve, reject) => {
            this.connectService
                .getTokenContracts()
                .forEach((contract: ITokenContract) => {
                    if (
                        contract.address[this.network].toLowerCase() === address
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
        for (let i = 0; i < nPairs.toNumber(); i++) {
            try {
                const pairAddress =
                    await this.connectService.contractFactory.allPairs(i);

                const pancakePair: PancakePair = PancakePair__factory.connect(
                    pairAddress,
                    this.connectService.signer
                );

                const token0Address = (
                    await pancakePair.token0()
                ).toLowerCase();
                const token1Address = (
                    await pancakePair.token1()
                ).toLowerCase();
                const token0: ITokenContract = await this.getIContractByAddress(
                    token0Address
                );
                const token1: ITokenContract = await this.getIContractByAddress(
                    token1Address
                );
                const [reserve0, reserve1] = await pancakePair.getReserves();
                const pair: IPair = {
                    name: `${token0.nameShort}/${token1.nameShort}`,
                    address: pairAddress,
                    instance: pancakePair,
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

    public async getRouterAdmins() {
        const admins: string[] = [];
        try {
            let adminCount = Number(
                await this.connectService.contractRouter_mod.getRoleMemberCount(
                    this.connectService.ADMIN_ROLE
                )
            );
            for (let i = 0; i < adminCount; ++i) {
                admins.push(
                    await this.connectService.contractRouter_mod.getRoleMember(
                        this.connectService.ADMIN_ROLE,
                        i
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
        return admins;
    }

    public async grantAdminRole(adminRoleAddress: string) {
        if (ethers.utils.isAddress(adminRoleAddress)) {
            let tx =
                await this.connectService.contractRouter_mod.addAdminAddress(
                    adminRoleAddress
                );
            this.smartWait(tx);
        } else {
            throw new Error("Invalid address");
        }
    }
    public async revokeAdminRole(adminRoleAddress: string) {
        try {
            if (ethers.utils.isAddress(adminRoleAddress)) {
                let tx =
                    await this.connectService.contractRouter_mod.revokeAdminAddress(
                        adminRoleAddress
                    );
                this.smartWait(tx);
            } else {
                throw new Error("Invalid address");
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async getWithdrawFeeAvailable(
        tokenContract: ERC20Basic
    ): Promise<BigNumber> {
        return await tokenContract.balanceOf(
            this.connectService.contractRouter_mod.address
        );
    }

    public async withdrawFees(contract: ERC20Basic, amount: BigNumber) {
        try {
            console.log(
                "Balance is: ",
                await this.getWithdrawFeeAvailable(contract)
            );
            await this.connectService.contractRouter_mod.withdrawFees(
                contract.address,
                amount
            );
        } catch (error) {
            console.log(error);
        }
    }

    public async setSwapFee(fee: BigNumber) {
        try {
            await this.connectService.contractRouter_mod.setSwapFee(fee);
        } catch (error) {
            console.log(error);
        }
    }

    public async setLsrMinBalance(balance: BigNumber) {
        try {
            await this.connectService.contractRouter_mod.setLsrMinBalance(
                balance
            );
        } catch (error) {
            console.log(error);
        }
    }

    public async smartWait(tx: ethers.ContractTransaction) {
        //this.network !== Hardhat.nameShort && (await tx.wait(1));
        await tx.wait(1);
    }
}
