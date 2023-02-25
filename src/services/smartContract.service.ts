import { ethers } from "ethers";
import {
    IPair,
    ISmartContract,
    Pair,
    Potato,
} from "../smart-contracts/smart-contract-data";
import PancakePairAbi from "../smart-contracts/abi/PancakePair.json";
import { BlockchainSubscriptions } from "./blockchainSubscriptions.service";
import { ConnectService } from "./connect.service";
import { ISmartContractService } from "./interfaces/ISmartContract.service";

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

    public async removeLiquidity(
        contractA: ISmartContract,
        contractB: ISmartContract,
        liquidity: BigInt
    ) {
        this.updateSmatrContractServiceNetwork();
        const pairAddress = await this.connectService.contractFactory.getPair(
            contractA.address[this.network],
            contractB.address[this.network]
        );

        const contractPair = new ethers.Contract(
            pairAddress,
            PancakePairAbi.abi,
            this.connectService.provider
        );

        // Approve to remove liquidity
        await contractPair
            .connect(this.connectService.signer)
            .approve(this.connectService.contractRouter_mod.address, liquidity);
        // Chack allowance
        const allowance = await contractPair.allowance(
            this.connectService.contractRouter_mod.address,
            this.connectService.contractRouter_mod.address
        );
        let tx = await this.connectService.contractRouter_mod
            .connect(this.connectService.signer)
            .removeLiquidity(
                contractA.address[this.network],
                contractB.address[this.network],
                liquidity,
                0,
                0,
                this.connectService.signer.getAddress(),
                2166049390489
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
        //await this.subscribePairEvents();
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

    public async getRouterAdmins() {
        const admins: string[] = [];
        try {
            let adminCount = (
                await this.connectService.contractRouter_mod.getRoleMemberCount(
                    this.connectService.ADMIN_ROLE
                )
            ).toNumber();
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
    public async revokeAdminRole(adminRoleAddress: string) {
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

    public async withdrawFees(contract: ISmartContract, amount: number) {
        try {
            if (
                (await contract.instance.balanceOf(
                    this.connectService.contractRouter_mod.address
                )) > amount
            ) {
                await this.connectService.contractRouter_mod.withdrawFees(
                    contract.instance.address,
                    amount
                );
            }
        } catch (error) {
            console.log(error);
        }
    }
}
