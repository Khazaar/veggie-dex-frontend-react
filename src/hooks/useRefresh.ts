import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/ISmartContractService";

export const useRefresh = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    const subscriptions: Subscription[] = [];
    useEffect(() => {
        subscriptions.push(
            smartContractService.TokenMinted$().subscribe(() => {
                fetchData()
                    .then(() => {})
                    .catch((error) => {
                        console.log(error);
                    });
            })
        );
        subscriptions.push(
            smartContractService.LiquidityAdded$().subscribe(() => {
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
            smartContractService.Swapped$().subscribe(() => {
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
            smartContractService.MintRevertedPeriod$().subscribe(() => {
                fetchData()
                    .then(() => {})
                    .catch((error) => {
                        console.log(error);
                    });
            })
        );

        subscriptions.push(
            smartContractService.AdminGranted$().subscribe(async () => {
                fetchData()
                    .then(() => {})
                    .catch((error) => {
                        console.log(error);
                    });
            })
        );

        subscriptions.push(
            smartContractService.AdminRevoked$().subscribe(async () => {
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
