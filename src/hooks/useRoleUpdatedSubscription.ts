import { useEffect } from "react";
import { Subscription } from "rxjs";
import { ISmartContractService } from "../services/interfaces/ISmartContract.service";

export const useRoleUpdatedSubscription = (
    smartContractService: ISmartContractService,
    fetchData: () => Promise<void>
) => {
    useEffect(() => {
        const subscription: Subscription[] = [];
        // Wallet subscriptions
        subscription.push(
            smartContractService.RoleUpdated$().subscribe(() => {
                fetchData().catch((error) => {
                    console.log(error);
                });
            })
        );

        return () => {
            subscription.forEach((subscription) => {
                subscription.unsubscribe();
            });
        };
    });
};
