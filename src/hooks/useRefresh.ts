import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/interfaces/ISmartContractService";

export const useRefresh = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    const subscriptions: Subscription[] = [];
    useEffect(() => {
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
                .Swapped$()
                .subscribe(() => {
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );

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

        subscriptions.push(
            smartContractService.blockchainSubscriptions
                .AdminGranted$()
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
                .AdminRevoked$()
                .subscribe(async () => {
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
