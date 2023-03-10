import { BigNumber, ethers } from "ethers";
import { Subject, Observable } from "rxjs";
import { ITokenContract } from "../smart-contracts/smart-contract-data";
import { IBlockchainSubscriptions } from "./IBlockchainSubscriptions.service";
import { ILiquidityAdded } from "../interfaces/ILiquidityAdded";
import { ILiquidityRemoved } from "../interfaces/ILiquidityRemoved";
import { SmartContractService } from "./smartContract.service";
import { IRoleChanged } from "../interfaces/IRoleChanged";

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
    private liquidityAdded = new Subject<ILiquidityAdded>();
    public LiquidityAdded$(): Observable<ILiquidityAdded> {
        return this.liquidityAdded.asObservable();
    }
    private liquidityRemoved = new Subject<ILiquidityRemoved>();
    public LiquidityRemoved$(): Observable<ILiquidityRemoved> {
        return this.liquidityRemoved.asObservable();
    }
    private roleGranted = new Subject<IRoleChanged>();
    public RoleGranted$(): Observable<IRoleChanged> {
        return this.roleGranted.asObservable();
    }

    private roleRevoked = new Subject<IRoleChanged>();
    public RoleRevoked$(): Observable<IRoleChanged> {
        return this.roleRevoked.asObservable();
    }
    private feeCharged = new Subject<string>();
    public FeeCharged$(): Observable<string> {
        return this.feeCharged.asObservable();
    }

    private feeWithdrawn = new Subject<string>();
    public FeeWithdrawn$(): Observable<string> {
        return this.feeWithdrawn.asObservable();
    }

    // Pair observables
    private swapped = new Subject<string>();
    public Swapped$(): Observable<string> {
        return this.swapped.asObservable();
    }

    // Router eventsAdmin features
    private setSwapFee = new Subject<BigNumber>();
    public SetSwapFee$(): Observable<BigNumber> {
        return this.setSwapFee.asObservable();
    }

    private setLsrMinBalance = new Subject<BigNumber>();
    public SetLsrMinBalance$(): Observable<BigNumber> {
        return this.setLsrMinBalance.asObservable();
    }

    public async subscribeAll() {
        await this.subscribeTokensEvents();
        await this.subscribeRouterEvents();
        await this.subscribeAdminEvents();
        console.info("Subscribed to all events");
        try {
            await this.subscribePairEvents();
        } catch (error) {
            console.error("subscribePairEvents error", error);
        }
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

                const filterMintReverted =
                    tokenContract.instance.filters.MintRevertedPeriod(
                        null,
                        null
                    );
                //tokenContract.instance.removeAllListeners("Transfer");
                tokenContract.instance.on(
                    filterTransfer,
                    (from: any, to: any, value: any) => {
                        console.info(
                            `Transfeed ${value} tokens ${tokenContract.nameShort} from ${from} to ${to}`
                        );
                        this.tokenTransfered.next(tokenContract);
                        if (from === ethers.constants.AddressZero) {
                            this.tokenMinted.next(tokenContract);
                            console.info(
                                `Minted ${value} tokens ${tokenContract.nameShort}  to ${to}`
                            );
                        }
                        tokenContract.instance.removeAllListeners();
                    }
                );

                tokenContract.instance.on(
                    filterMintReverted,
                    (timePassedSeconds, mintLimitPeriodSeconds) => {
                        const minRevertedPeriodMsg = `Passed only ${timePassedSeconds} seconds, required to wait ${mintLimitPeriodSeconds} seconds`;
                        console.log(minRevertedPeriodMsg);
                        this.mintRevertedPeriod.next(minRevertedPeriodMsg);
                    }
                );
            }
        );
    }

    public async subscribePairEvents() {
        try {
            const nPairs =
                await this.smartContractService.connectService.contractFactory.allPairsLength();
            if (nPairs.toNumber() === 0) {
                console.warn("No pairs to subscribe");
                return;
            }

            const pairs = await this.smartContractService.getPairs();
            pairs &&
                pairs.forEach((iPair) => {
                    const filterSwap = iPair.instance.filters.Swap(
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                    );
                    iPair.instance.removeAllListeners(filterSwap);
                    iPair.instance.on(
                        filterSwap,
                        (
                            address,
                            amount0In,
                            amount1In,
                            amount0Out,
                            amount1Out,
                            to
                        ) => {
                            const msg = `Swap in Pair ${iPair.name}: address ${address}, amount0In ${amount0In}, amount1In ${amount1In}, amount0Out ${amount0Out}, amount1Out ${amount1Out}, to ${to}`;
                            console.info(msg);
                            this.swapped.next(msg);
                        }
                    );
                });
        } catch (e) {
            throw e;
        }
    }

    public async subscribeRouterEvents() {
        const filterAddLiquidity =
            this.smartContractService.connectService.contractRouter_mod.filters.AddLiquidity(
                null,
                null
            );
        this.smartContractService.connectService.contractRouter_mod.on(
            filterAddLiquidity,
            (amountA, amountB) => {
                console.info(
                    `Added liquidity: amountA ${amountA}, amountB ${amountB}`
                );

                this.liquidityAdded.next({ amountA, amountB });
            }
        );

        const filterRemoveLiquidity =
            this.smartContractService.connectService.contractRouter_mod.filters.RemoveLiquidity(
                null,
                null
            );
        this.smartContractService.connectService.contractRouter_mod.on(
            filterRemoveLiquidity,
            (amount0, amount1) => {
                console.info(
                    `Removed liquidity: amount0 ${amount0}, amount1 ${amount1}`
                );

                this.liquidityRemoved.next({ amount0, amount1 });
            }
        );

        const filterFeeCharged =
            this.smartContractService.connectService.contractRouter_mod.filters.FeeCharged(
                null,
                null
            );
        this.smartContractService.connectService.contractRouter_mod.on(
            filterFeeCharged,
            (token, amount) => {
                this.feeCharged.next(`Charged fee of ${amount} ${token}`);
            }
        );

        const filterFeeWithdrawn =
            this.smartContractService.connectService.contractRouter_mod.filters.WithdrawFees(
                null,
                null
            );

        this.smartContractService.connectService.contractRouter_mod.on(
            filterFeeWithdrawn,
            (token, amount) => {
                const msg = `Withdrawn fee of ${amount} ${token}`;
                this.feeWithdrawn.next(msg);
                console.info(msg);
            }
        );

        const filterRoleGranted =
            this.smartContractService.connectService.contractRouter_mod.filters.RoleGranted(
                null,
                null
            );

        this.smartContractService.connectService.contractRouter_mod.on(
            filterRoleGranted,
            (role, account, sender) => {
                console.log(`Role ${role} granted to ${account} by ${sender}`);
                this.roleGranted.next({ role, account, sender });
            }
        );

        const filterRoleRevoked =
            this.smartContractService.connectService.contractRouter_mod.filters.RoleRevoked(
                null,
                null
            );

        this.smartContractService.connectService.contractRouter_mod.on(
            filterRoleRevoked,
            (role, account, sender) => {
                console.log(
                    `Role ${role} revoked from ${account} by ${sender}`
                );
                this.roleRevoked.next({ role, account, sender });
            }
        );
    }

    public async subscribeAdminEvents() {
        const filterSetSwapFee =
            this.smartContractService.connectService.contractRouter_mod.filters.SetSwapFee(
                null
            );

        // this.smartContractService.connectService.contractRouter_mod.removeAllListeners(
        //     filterSetSwapFee
        // );
        this.smartContractService.connectService.contractRouter_mod.on(
            filterSetSwapFee,
            (swapFee) => {
                console.log(`Swap fee set to ${swapFee}`);
                this.setSwapFee.next(swapFee);
            }
        );
        const filterSetLsrMinBalance =
            this.smartContractService.connectService.contractRouter_mod.filters.SetLsrMinBalance(
                null
            );
        this.smartContractService.connectService.contractRouter_mod.removeAllListeners(
            filterSetLsrMinBalance
        );

        this.smartContractService.connectService.contractRouter_mod.on(
            filterSetLsrMinBalance,
            (lsrMinBalance) => {
                console.log(`Lsr min balance set to ${lsrMinBalance}`);
                this.setLsrMinBalance.next(lsrMinBalance);
            }
        );
    }
}
