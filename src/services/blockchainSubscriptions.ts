import { Subject, Observable } from "rxjs";
import { ISmartContract } from "../smart-contracts/smart-contract-data";
import { SmartContractService } from "./smart-contract.service";

export class BlockchainSubscriptions {
    constructor(private smartContractService: SmartContractService) {}
    private liquidityAdded = new Subject<void>();
    public LiquidityAdded$(): Observable<void> {
        return this.liquidityAdded.asObservable();
    }
    private swapped = new Subject<void>();
    public Swapped$(): Observable<void> {
        return this.swapped.asObservable();
    }
    private tokenTransfered = new Subject<ISmartContract>();
    public TokenTransfered$(): Observable<ISmartContract> {
        return this.tokenTransfered.asObservable();
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
    public async subscribeAll() {
        await this.subscribeRouterContractsEvents();
        //await this.subscribeMintRevertedPeriodEvent();
        await this.subscribeTransferTokensEvents();
        await this.subscribeAdminEvents();
    }

    public async subscribePairEvents() {
        const pairs = await this.smartContractService.getPairs();
        pairs.forEach((iPair) => {
            iPair.instance.removeAllListeners();
            iPair.instance.once("Swap", (amountA, amountB) => {
                console.log(
                    `Added liquidity to ${iPair.name}: amoint A ${amountA}, amountB ${amountB}`
                );
                this.swapped.next();
            });
        });
    }

    public async subscribeRouterContractsEvents() {
        //this.connectService.contractRouter_mod.un;
        this.smartContractService.connectService.contractRouter_mod
            .connect(this.smartContractService.connectService.signer)
            .once(
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
        this.smartContractService.connectService.tokenContracts.forEach(
            (iContract) => {
                iContract.instance.removeAllListeners();
                iContract.instance
                    .connect(this.smartContractService.connectService.signer)
                    .once("Transfer", (from, to, amount) => {
                        console.log(
                            `Transfeed ${amount} tokens from ${from} to ${to}`
                        );
                        this.tokenTransfered.next(iContract);
                    });
            }
        );
    }

    // //!!! FIX only for apple
    // public async subscribeMintRevertedPeriodEvent() {
    //     this.smartContractService.connectService.contractApple.once(
    //         "MintRevertedPeriod",
    //         (timePassedSeconds, mintLimitPeriodSeconds) => {
    //             const err = `Passed only ${timePassedSeconds} seconds, required to wait ${mintLimitPeriodSeconds} seconds`;
    //             console.log(err);
    //             this.mintRevertedPeriod.next(err);
    //         }
    //     );
    // }

    public async subscribeAdminEvents() {
        this.smartContractService.connectService.contractRouter_mod
            .connect(this.smartContractService.connectService.signer)
            .once("RoleGranted", (role, account) => {
                console.log(`Role ${role} granted to ${account}`);
                this.adminGranted.next(account);
            });

        this.smartContractService.connectService.contractRouter_mod
            .connect(this.smartContractService.connectService.signer)
            .once("RoleRevoked", (role, account) => {
                console.log(`Role ${role} revoked from ${account}`);
                this.adminRevoked.next(account);
            });
    }
}
