import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/interfaces/ISmartContract.service";

export const useAdminRolesSubscription = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    useEffect(() => {
        const subscriptions: Subscription[] = [];
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
