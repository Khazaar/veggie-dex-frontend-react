import { PancakePair__factory } from "../smart-contracts/types/factories";
import { ethers } from "ethers";
import {
    IPair,
    ITokenContract,
    Potato,
} from "../smart-contracts/smart-contract-data";
import PancakePairAbi from "../smart-contracts/abi/PancakePair.json";
import { BlockchainSubscriptions } from "./blockchainSubscriptions.service";
import { ConnectService } from "./connect.service";
import { ISmartContractService } from "./interfaces/ISmartContract.service";
import { ERC20Basic, PancakePair } from "../smart-contracts/types";
import { AddressLike } from "ethers/types/address";

export class SmartContractService implements ISmartContractService {
    public tokenPairs: IPair[] = [];
    public network: keyof typeof Potato.address;
    public gasLimit = 50000;
    public blockchainSubscriptions: BlockchainSubscriptions;
    public hasAdminRole = false;
    public hasOwnerRole = false;

    constructor(public connectService: ConnectService) {
        this.blockchainSubscriptions = new BlockchainSubscriptions(this);
    }

    public async initSmartContractService() {
        try {
            this.updateSmatrContractServiceNetwork();
            await this.connectService.initConnectService();
            await this.blockchainSubscriptions.subscribeAll();
        } catch (error) {
            console.log(
                `Error in initSmartContractService: ${(error as Error).message}`
            );
        }
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
            (await this.connectService.signer.getAddress()) ==
            (await this.connectService.contractRouter_mod.getOwnerAddress())
        ) {
            this.hasOwnerRole = true;
            console.log("Owner detected...");
        } else {
            this.hasOwnerRole = false;
        }
    }

    public updateSmatrContractServiceNetwork() {
        this.network = this.connectService.network
            .nameShort as keyof typeof Potato.address;
    }

    public async mintTokens(contract: ERC20Basic, amount: BigInt) {
        //this.fetchSmartContract();

        //await contract.getTokens(amount.toString());
        await contract.getTokens(ethers.parseEther("0.00000000000000001"));
    }

    public async getTokensBalance(contract: ERC20Basic): Promise<BigInt> {
        //this.fetchSmartContract();

        return await contract.balanceOf(
            await this.connectService.signer.getAddress()
        );
    }
    public async getSignerBalance() {
        return ethers.formatEther(await this.connectService.getSignerBalance());
    }
    public async addLiquidity(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        amountA: BigInt,
        amountB: BigInt
    ) {
        this.updateSmatrContractServiceNetwork();
        let tx = await contractA.approve(
            this.connectService.contractRouter_mod.getAddress(),
            amountA.toString(),
            { gasLimit: this.gasLimit }
        );
        await tx.wait(1);
        tx = await contractB.approve(
            this.connectService.contractRouter_mod.getAddress(),
            amountB.toString(),
            { gasLimit: this.gasLimit }
        );
        await tx.wait(1);
        console.log(
            `Allowance A set to: ${await contractA.allowance(
                this.connectService.signer.getAddress(),
                this.connectService.contractRouter_mod.getAddress()
            )}`
        );
        console.log(
            `Allowance B set to: ${await contractB.allowance(
                this.connectService.signer.getAddress(),
                this.connectService.contractRouter_mod.getAddress()
            )}`
        );
        tx = await this.connectService.contractRouter_mod.addLiquidity(
            await contractA.getAddress(),
            await contractB.getAddress(),
            amountA.toString(),
            amountB.toString(),
            1,
            1,
            await this.connectService.signer.getAddress(),
            216604939048
        );
        await tx.wait(1);
    }

    public async removeLiquidity(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        liquidity: BigInt
    ) {
        this.updateSmatrContractServiceNetwork();
        const pairAddress = await this.connectService.contractFactory.getPair(
            await contractA.getAddress(),
            await contractB.getAddress()
        );

        const contractPair = new ethers.Contract(
            pairAddress,
            PancakePairAbi.abi,
            this.connectService.provider
        );

        // Approve to remove liquidity
        await contractPair.approve(
            await this.connectService.contractRouter_mod.getAddress(),
            liquidity
        );
        let tx = await this.connectService.contractRouter_mod.removeLiquidity(
            await contractA.getAddress(),
            await contractB.getAddress(),
            liquidity.toString(),
            1,
            1,
            await this.connectService.signer.getAddress(),
            2166049390489
        );

        await tx.wait(1);
    }

    public async swap(
        contractA: ERC20Basic,
        contractB: ERC20Basic,
        amountA: BigInt
    ) {
        this.updateSmatrContractServiceNetwork();
        let tx = await contractA.approve(
            await this.connectService.contractRouter_mod.getAddress(),
            amountA.toString()
        );
        await tx.wait(1);
        console.log(
            `Allowance A set to: ${await contractA.allowance(
                this.connectService.signer.getAddress(),
                await this.connectService.contractRouter_mod.getAddress()
            )}`
        );

        tx =
            await this.connectService.contractRouter_mod.swapExactTokensForTokens(
                amountA.toString(),
                1,
                [await contractA.getAddress(), await contractB.getAddress()],
                this.connectService.signer.getAddress(),
                99999999999999
            );
        await tx.wait(1);
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
        for (let i = 0; i < nPairs; i++) {
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
        try {
            if (ethers.isAddress(adminRoleAddress)) {
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
    public async revokeAdminRole(adminRoleAddress: string) {
        try {
            if (ethers.isAddress(adminRoleAddress)) {
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

    public async withdrawFees(contract: ERC20Basic, amount: number) {
        try {
            if (
                (await contract.balanceOf(
                    await this.connectService.contractRouter_mod.getAddress()
                )) > amount
            ) {
                await this.connectService.contractRouter_mod.withdrawFees(
                    contract.getAddress(),
                    amount
                );
            }
        } catch (error) {
            console.log(error);
        }
    }
}
