import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/ISmartContract.service";

export const useTokenTransferSubscription = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    useEffect(() => {
        const subscriptions: Subscription[] = [];
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
