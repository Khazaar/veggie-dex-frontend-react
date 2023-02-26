import { TransferEvent } from "./../smart-contracts/types/ERC20Basic";
import { ethers } from "ethers";
import { Subject, Observable } from "rxjs";
import { ITokenContract } from "../smart-contracts/smart-contract-data";
import { IBlockchainSubscriptions } from "./interfaces/IBlockchainSubscriptions.service";
import { SmartContractService } from "./smartContract.service";

export class BlockchainSubscriptions implements IBlockchainSubscriptions {
    constructor(private smartContractService: SmartContractService) {}

    // Token observables
    private tokenMinted = new Subject<ITokenContract>();
    public TokenMinted$(): Observable<ITokenContract> {
        return this.tokenMinted.asObservable();
    }
    private tokenTransfered = new Subject<ITokenContract>();
    public TokenTransfered$(): Observable<ITokenContract> {
        return this.tokenTransfered.asObservable();
    }
    private mintRevertedPeriod = new Subject<string>();
    public MintRevertedPeriod$(): Observable<string> {
        return this.mintRevertedPeriod.asObservable();
    }

    // Router observables
    private liquidityAdded = new Subject<void>();
    public LiquidityAdded$(): Observable<void> {
        return this.liquidityAdded.asObservable();
    }
    private adminGranted = new Subject<string>();
    public AdminGranted$(): Observable<string> {
        return this.adminGranted.asObservable();
    }

    private adminRevoked = new Subject<string>();
    public AdminRevoked$(): Observable<string> {
        return this.adminRevoked.asObservable();
    }
    // Pair observables
    private swapped = new Subject<void>();
    public Swapped$(): Observable<void> {
        return this.swapped.asObservable();
    }

    public async subscribeAll() {
        await this.subscribeTokensEvents();
        await this.subscribePairEvents();
        await this.subscribeRouterEvents();
    }
    public async unsubscribeAll() {
        this.smartContractService.connectService.tokenContracts.forEach(
            async (tokenContract) => {
                tokenContract.instance.removeAllListeners();
            }
        );
    }

    public async subscribeTokensEvents() {
        this.smartContractService.connectService.tokenContracts.forEach(
            async (tokenContract) => {
                const filterTransfer = tokenContract.instance.filters.Transfer(
                    null,
                    null,
                    null
                );

                //tokenContract.instance.removeAllListeners();

                tokenContract.instance.on(
                    filterTransfer,
                    (from: any, to: any, value: any) => {
                        console.log(
                            `1Transfeed ${value} tokens ${tokenContract.nameShort} from ${from} to ${to}`
                        );
                        this.tokenTransfered.next(tokenContract);
                        from === ethers.constants.AddressZero &&
                            this.tokenMinted.next(tokenContract);
                        console.log(
                            `Minted ${value} tokens ${tokenContract.nameShort}  to ${to}`
                        );
                        tokenContract.instance.removeAllListeners();
                    }
                );

                tokenContract.instance.on(
                    "MintRevertedPeriod",
                    (timePassedSeconds, mintLimitPeriodSeconds) => {
                        const err = `Passed only ${timePassedSeconds} seconds, required to wait ${mintLimitPeriodSeconds} seconds`;
                        console.log(err);
                        this.mintRevertedPeriod.next(err);
                    }
                );
            }
        );
    }

    public async subscribePairEvents() {
        const pairs = await this.smartContractService.getPairs();
        pairs.forEach((iPair) => {
            //iPair.instance.removeAllListeners();
            iPair.instance.on(
                "Swap",
                (address, amount0In, amount1In, amount0Out, amount1Out, to) => {
                    console.log(
                        `Swap in Pair ${iPair.name}: address ${address}, amount0In ${amount0In}, amount1In ${amount1In}, amount0Out ${amount0Out}, amount1Out ${amount1Out}, to ${to}`
                    );
                    this.swapped.next();
                    iPair.instance.removeAllListeners();
                }
            );
        });
    }

    public async subscribeRouterEvents() {
        //this.smartContractService.connectService.contractRouter_mod.removeAllListeners();
        this.smartContractService.connectService.contractRouter_mod.on(
            "AddLiquidity",
            (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
                console.log(
                    `Added liquidity: sender ${sender}, amount0In ${amount0In}, amount1In ${amount1In}, amount0Out ${amount0Out}, amount1Out ${amount1Out}, to ${to}`
                );
                this.liquidityAdded.next();
            }
        );
        this.smartContractService.connectService.contractRouter_mod.on(
            "RoleGranted",
            (role, account) => {
                console.log(`Role ${role} granted to ${account}`);
                this.adminGranted.next(account);
            }
        );

        this.smartContractService.connectService.contractRouter_mod.on(
            "RoleRevoked",
            (role, account) => {
                console.log(`Role ${role} revoked from ${account}`);
                this.adminRevoked.next(account);
            }
        );
    }
}
