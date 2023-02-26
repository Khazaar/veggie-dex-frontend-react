import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/interfaces/ISmartContract.service";

export const useRouterPairSubscription = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    useEffect(() => {
        const subscriptions: Subscription[] = [];

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

        return () => {
            subscriptions.forEach((subscription) => {
                //subscription.unsubscribe();
            });
        };
    }, []);
};

// fetchData().catch((error) => {
//     console.log(error);
// });
