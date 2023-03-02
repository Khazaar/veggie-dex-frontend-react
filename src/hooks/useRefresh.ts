import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/ISmartContract.service";

export const useRefresh = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    useEffect(() => {
        const subscriptions: Subscription[] = [];
        // Token subscriptions
        // subscriptions.push(
        //     smartContractService.blockchainSubscriptions
        //         .TokenMinted$()
        //         .subscribe(() => {
        //             fetchData()
        //                 .then(() => {})
        //                 .catch((error) => {
        //                     console.log(error);
        //                 });
        //         })
        // );

        subscriptions.push(
            smartContractService.blockchainSubscriptions
                .TokenTransfered$()
                .subscribe(() => {
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );
        subscriptions.push(
            smartContractService.blockchainSubscriptions
                .MintRevertedPeriod$()
                .subscribe(() => {
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );

        // Router subscriptions
        subscriptions.push(
            smartContractService.blockchainSubscriptions
                .LiquidityAdded$()
                .subscribe(() => {
                    fetchData()
                        .then(() => {
                            console.log("LiquidityAdded$");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );
        subscriptions.push(
            smartContractService.blockchainSubscriptions
                .RoleGranted$()
                .subscribe(async () => {
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );
        subscriptions.push(
            smartContractService.blockchainSubscriptions
                .RoleRevoked$()
                .subscribe(async () => {
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );

        // Pair subscriptions
        subscriptions.push(
            smartContractService.blockchainSubscriptions
                .Swapped$()
                .subscribe(() => {
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );

        // Wallet subscriptions
        subscriptions.push(
            smartContractService.connectService
                .walletConnected$()
                .subscribe(() => {
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );

        return () => {
            subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        };
    });
};

// fetchData().catch((error) => {
//     console.log(error);
// });
